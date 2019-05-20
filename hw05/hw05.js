var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var onlineUsers = 0;
var members = [];

app.get('/', function(req, res){
  res.sendFile(__dirname + '/hw05-login.html');
});

app.get ('/change', function (req, res) {
	let name = req.query.name;
	console.log (name + ' is on ...') 
	res.sendFile (__dirname + '/hw05-chat.html');
});

io.on('connection', function(socket){  // connection is same as connect
  //上線通知
  socket.on('login', function(name){
	onlineUsers++;
    io.emit('login', name, onlineUsers);
  });
  //離線通知
  socket.on('disconnect', function () {
	onlineUsers--;
	io.sockets.emit('disconnect', onlineUsers);
  });
  //訊息傳送
  socket.on('chat message', function(msg, name){
    io.emit('chat message', msg, name);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});