var socket = io();

socket.on('connect', function () {
	console.log('Conncted to socket.io server!');
});