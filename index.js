var gps = require("gps-tracking");
var express = require('express');
var app = express();
var server = app.listen(3000);
var io = require('socket.io')(server);	
var MongoClient = require('mongodb').MongoClient,
	assert = require('assert');

var mongourl = 'mongodb://localhost:27017/gps_server';

var options = {
	'debug'                 : false, //We don't want to debug info automatically. We are going to log everything manually so you can check what happens everywhere
	'port'                  : 8090,
	'device_adapter'        : "TK103"
}

app.use(express.static('site/public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/site/index.html');
});

MongoClient.connect(mongourl, function(err, db) {
	assert.equal(null, err);
	console.log("Connected correctly to mongo DB server");

	var collections = {
		'pings': db.collection('pings')
	};

	io.on('connection', function(socket) {
		collections.pings.find({}).sort({inserted: -1}).limit(300).toArray(function(err, docs) {
			assert.equal(err, null);
			socket.emit('positions', {
				positions: docs
			});

		});
	});

	var server = gps.server(options, function(device, connection) {

		device.on("connected",function(data) {

			console.log("I'm a new device connected");
			return data;

		});

		device.on("login_request",function(device_id, msg_parts) {

			console.log('Hey! I want to start transmiting my position. Please accept me. My name is ' + device_id);

			this.login_authorized(true); 

			console.log("Ok, " + device_id + ", you're accepted!");

		});
		

		device.on("ping",function(data) {
			data.uid = this.getUID();
			io.emit('ping', data);

			//this = device
			console.log("I'm here: " + data.latitude + ", " + data.longitude + " (" + this.getUID() + ")");

			var data_to_insert = data;
			data_to_insert.uid = this.getUID();

			collections.pings.insert(data_to_insert);

			//Look what informations the device sends to you (maybe velocity, gas level, etc)
			//console.log(data);
			return data;

		});

	   device.on("alarm",function(alarm_code, alarm_data, msg_data) {
			console.log("Help! Something happend: " + alarm_code + " (" + alarm_data.msg + ")");
		}); 

		//Also, you can listen on the native connection object
		connection.on('data', function(data) {
			//echo raw data package
			//console.log(data.toString()); 
		})

	});
});

