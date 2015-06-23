var map;
var devices = {}


function initialize() {
	var mapOptions = {
		center: new google.maps.LatLng(-33.543103333333335,-70.62021666666666),
		zoom: 11
	};
	map = new google.maps.Map(document.getElementById('map-canvas'),
			mapOptions);
}


google.maps.event.addDomListener(window, 'load', function(){
	
});

function checkIfMapExists(){
	if(!map) {
		initialize();
	}
}

function addDevice(uid, latLng){
	checkIfMapExists();

	var marker = new google.maps.Marker({
		position: latLng,
		map: map,
		title: 'Hello World!'
	});

	marker.setMap(map);

	devices[uid] = {
		uid: uid,
		marker: marker
	}
}

function checkIfDeviceExists(data){
	var uid = data.uid;

	console.log(data);
	if(typeof devices[uid] == "undefined") {
		addDevice(uid, new google.maps.LatLng(data.data.latitude, data.data.longitude))
	}
}

var socket = io.connect(window.location.host);
socket.on('ping', function (uid, data) {

	checkIfDeviceExists(uid);

	console.log(data, data);
	socket.emit('my other event', { my: 'data' });
});