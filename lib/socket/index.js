'use strict';

const _ = require('lodash');
const utils = require('./utils');

const data = {};

const getUserData = (room, id) => {
  return _.get(data, `${room}.${id}`);
};

const getUserName = (room, id) => {
  return _.get(getUserData(room, id), 'user');
};

const getUserVote = (room, id) => {
  return _.get(getUserData(room, id), 'vote');
};

const getVotes = (room) => {
  return _.map(_.keys(_.get(data, room)), (id) => (
    _.get(data, `${room}.${id}`)
  ));
}

const emitUpdate = (namespace, room) => {
  namespace.emit('update', getVotes(room));
  utils.debug(data);
};

const emitAdmin = (namespace, room, id) => {
  namespace.to(id).emit('You are admin', true);
}

const emitBoot = (namespace, reason) => {
  console.log('Booting room');
  namespace.volatile.emit('boot', reason);
};

const createRoom = (namespace, room, id) => {
  if (!_.get(data, `${room}`)) {
    _.set(data, `${room}`, {});
    emitAdmin(namespace, room, id);
    return true;
  }
  return false;
}

const createUser = (room, id, user, isAdmin) => {
  _.set(data, `${room}.${id}`, {
    user,
    vote: null,
    isAdmin,
  });
  utils.log(room, getUserName(room, id), 'Connected');
};

const isEmptyRoom = (room) => {
  return _.keys(data[room]).length === 0;
}

const resetRoom = (room) => {
  _.forEach(_.keys(_.get(data, room)), (key) => {
    _.set(data, `${room}.${key}.vote`, null);
  });
}

const removeRoom = (room) => {
  _.unset(data, `${room}`);
   // delete io.nsps[`/${room}`];
}

const removeUser = (namespace, room, id) => {
  utils.log(room, getUserName(room, id), 'Disconnected');
  if (_.get(data, `${room}.${id}.isAdmin`)) {
    //emitBoot(namespace, 'Admin left');
  }
  _.unset(data, `${room}.${id}`);
  if (isEmptyRoom(room)) {
    removeRoom(room);
  }
};

const everyoneVoted = (room) => {
  let isTrue = true;
  _.forEach(_.keys(_.get(data, room)), (key) => {
    console.dir(_.get(data, `${room}.${key}.vote`))

    if(!_.get(data, `${room}.${key}.vote`)) {
      console.dir('hasnt voted')
      isTrue = false;
    }
  });
  return isTrue;
}

const castVote = (namespace, room, id, vote) => {
  _.set(data, `${room}.${id}.vote`, vote);
  utils.log(room, getUserName(room, id), `${getUserName(room, id)} voted ${getUserVote(room, id)}`);

  if (everyoneVoted(room)) {
    namespace.emit('reveal', true);
    console.dir('truf');
  } else {
    namespace.emit('reveal', false);
    console.dir('false');

  }
};

const init = (req, res) => {
  const room = req.params.room;
  const user = req.params.user;

  const namespace = io.of(`/${room}`);

  namespace.on('connection', (socket) => {
    const isNewRoom = createRoom(namespace, room, socket.id);
    createUser(room, socket.id, user, isNewRoom);
    emitUpdate(namespace, room);

    socket.on('cast vote', (vote) => {
      castVote(namespace, room, socket.id, vote);
      emitUpdate(namespace, room);
    });

    socket.on('disconnect', (reason) => {
      removeUser(namespace, room, socket.id);
      emitUpdate(namespace, room);
    });

    socket.on('reveal', (value) => {
      namespace.emit('reveal', value);
    });

    socket.on('reset', (value) => {
      namespace.emit('reset', value);
      resetRoom(room);
      emitUpdate(namespace, room);
    });
  });
};
module.exports.init = init;
