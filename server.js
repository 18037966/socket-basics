var PORT = process.env.PORT || 3000;
var moment = require('moment');
var express = require("express");
var app = express();

var http = require("http").Server(app);
var io = require("socket.io")(http);

app.use(express.static(__dirname + "/public"));

io.on("connection", function(socket){
	console.log("user connected via socket.io");
    
	socket.on('message', function (message) {
		console.log('Message received: ' + message.text);

		message.timestamp = moment().valueOf();
		io.emit('message', message);//sending message to anybody connected to the chat app even the one who is sending the message
	});

	socket.emit('message', {
		name: "System",
		text: 'Welcome to the chat application!',
		timestamp: moment().valueOf()
	});
	
});

http.listen(PORT, function(){
	console.log("Server started");
});
