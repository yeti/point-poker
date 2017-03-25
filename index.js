'use strict';

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

const sendPage = (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
};

const log = (room, user, msg) => {
  console.dir(`${user}(${room}): ${msg}`);
}

const defaultRoute = (req, res) => {
  let room = req.params.room;
  let user = req.params.user;

  let namespace = io.of(`/${room}`);

  namespace.on('connection', (socket) => {
    log(room, user, 'Connected');

    socket.on('cast vote', (vote) => {
      namespace.emit('cast vote', vote);
      console.dir(vote)
      log(room, user, `${vote.user} voted ${vote.value}`);
    });

    socket.on('disconnect', () => {
      log(room, user, 'Disconnected');
    });

  });

  sendPage(req, res);
};

app.get('/', sendPage);
app.get('/:room/', sendPage);
app.get('/:room/:user', defaultRoute);

http.listen(port, function(){
  console.log('listening on *:' + port);
});
