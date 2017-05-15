'use strict';

const express = require('express');

const app = express();

const http = require('http').Server(app);
const io =  require('socket.io')(http);
const socket = require('./lib/socket');

socket.init(io);

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

const sendPage = (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
};

app.get('/*', sendPage);
/*
app.get('/:room/', sendPage);
app.get('/:room/:user', sendPage);
*/

http.listen(port, function(){
  console.log('listening on *:' + port);
});
