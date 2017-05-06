'use strict';

const _ = require('lodash');

const prettyJson = require('prettyjson');

const data = {};

module.exports.init = (io) => {

  const getVotes = (room) => {
    return _.map(_.keys(_.get(data, room)), (id) => (
      _.get(data, [room, id])
    ));
  };

  const everyoneVoted = (room) => {
    let isTrue = true;
    _.forEach(_.keys(_.get(data, room)), (key) => {
      if(!_.get(data, [room, key, 'vote'])) {
        isTrue = false;
      }
    });
    return isTrue;
  }

  const checkComplete = (room) => {
    io.to(room).emit('reveal', everyoneVoted(room));
  };

  const emit = (room, eventName, value) => {
    io.to(room).emit(eventName, value);
  };

  const emitUpdate = (room) => {
    emit(room, 'update', getVotes(room));
    checkComplete(room);
    console.log('-_-_-_-_-_-_-_-');
    console.log(prettyJson.render(data, {
      keysColor: 'blue',
      stringColor: 'red',
    }));
  };

  const hasAdmin = (room) => {
    let isTrue = false;
    _.forEach(_.keys(_.get(data, room)), (key) => {
      if(_.get(data, [room, key, 'isAdmin'])) {
        isTrue = true;
      }
    });
    return isTrue;
  };

  const givePrivileges = (id, isAdmin) => {
    io.to(id).emit('You are admin', isAdmin);
  };

  const createUser = (room, id, user) => {
    const isAdmin = !hasAdmin(room);
    _.set(data, [room, id], {
      user,
      vote: null,
      isAdmin,
    });
    givePrivileges(id, isAdmin);
  };

  const getRoom = (id) => {
    let originRoom;
    _.forOwn(data, (value, room) => {
      if (_.has(data, [room, id])) {
        originRoom = room;
      }
    });
    return originRoom;
  };

  const removeUser = (id) => {
    const room = getRoom(id);
    _.unset(data, [room, id]);
    if (_.keys(_.get(data, room)).length === 0) {
      _.unset(data, room);
    }
  };

  const resetRoom = (room) => {
    _.forEach(_.keys(_.get(data, room)), (key) => {
      _.set(data, [room, key, 'vote'], null);
    });
    emit(room, 'reset', true);
  };

  io.on('connect', (socket) => {
    socket.emit('authenticate', 'Who are you?', (creds) => {
      createUser(creds.room,  socket.id, creds.user);
      socket.join(creds.room);
      emitUpdate(creds.room);
    });

    socket.on('vote', (vote) => {
      _.set(data, [getRoom(socket.id), socket.id, 'vote'], vote);
      emitUpdate(getRoom(socket.id));
    });

    socket.on('disconnect', () => {
      const room = getRoom(socket.id);
      removeUser(socket.id)
      emitUpdate(room);
    });

    socket.on('reveal', (value) => {
      emit(getRoom(socket.id), 'reveal', value);
    });

    socket.on('reset', () => {
      resetRoom(getRoom(socket.id));
      emitUpdate(getRoom(socket.id));
    });
  });
};

module.exports.getData = () => data;
module.exports.resetData = () => {
  _.forEach(_.keys(data), key => {
    _.unset(data, key);
  });
};
