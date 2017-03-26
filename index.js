'use strict';

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const _ = require('lodash');
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

const data = {};

const sendPage = (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
};

const log = (room, user, msg) => {
  console.dir(`${user}(${room}): ${msg}`);
};

const debug = () => {
  console.dir('===============')
  console.dir(data)
};

const emitUpdate = (namespace, room) => {
  namespace.emit('update', data[room]);
  debug();
};

const openSocket = (req, res) => {
  let room = req.params.room;
  let user = req.params.user;

  let namespace = io.of(`/${room}`);

  if (!data[room]) {
    data[room] = {};
  }

  namespace.on('connection', (socket) => {
    log(room, user, 'Connected');

    if (!data[room][user]) {
      data[room][user] = null;
      emitUpdate(namespace, room);
    }

    socket.on('cast vote', (vote) => {
      log(room, user, `${vote.user} voted ${vote.value}`);
      data[room][vote.user] = vote.value;

      emitUpdate(namespace, room);
    });

    socket.on('disconnect', () => {
      log(room, user, 'Disconnected');
      delete data[room][user];

      if (_.isEmpty(data[room])) {
        console.dir(`Closing ${room}`);
        delete data[room];
      }

      emitUpdate(namespace, room);
    });
  });

  sendPage(req, res);
};

app.get('/', sendPage);
app.get('/:room/', sendPage);
app.get('/:room/:user', openSocket);

http.listen(port, function(){
  console.log('listening on *:' + port);
});
