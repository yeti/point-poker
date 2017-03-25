'use strict';

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/home.html');
});

app.get('/:id', (req, res) => {
  console.dir(`=== ${req.params.id} ===`);

  let roomId = req.params.id;

  let nsp = io.of(`/${roomId}`);
  nsp.on('connection', function(socket){
    console.log('someone connected');

    socket.on('chat message', function(msg){
      console.log(`message: ${msg}`);
      nsp.emit('chat message', msg);
    });

    socket.on('disconnect', function(msg){
      console.log('disconnecting mang')
    });

  });

  res.sendFile(__dirname + '/public/index.html');
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
