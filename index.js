'use strict';

const express = require('express');
const app = express();
const http = require('http').Server(app);
global.io =  require('socket.io')(http);

const socket = require('./lib/socket');
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

const sendPage = (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
};

app.get('/', sendPage);
app.get('/:room/', sendPage);
app.get('/:room/:user', (req, res) => {
  socket.init(req, res);
  sendPage(req, res);
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
