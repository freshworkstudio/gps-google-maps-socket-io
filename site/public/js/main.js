var map;
var devices = {}


function initialize(latLng) {
	var mapOptions = {
		center: latLng,
		zoom: 11
	};
	map = new google.maps.Map(document.getElementById('map-canvas'),
			mapOptions);
}


google.maps.event.addDomListener(window, 'load', function(){
	
});

function checkIfMapExists(latLng){
	if(!map) {
		initialize(latLng);
	}
}

function addDevice(uid, latLng){
	checkIfMapExists(latLng);

	var marker = new google.maps.Marker({
		position: latLng,
		map: map,
		title: 'UID: ' + uid
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