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

const emitAdmin = (namespace, id) => {
  console.log('Is Admin');
  namespace.to(id).emit('You are admin', true);
}

const emitBoot = (namespace, reason) => {
  console.log('Booting room');
  namespace.emit('boot', reason);
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

const removeRoom = (room) => {
  _.unset(data, `${room}`);
}

const removeUser = (namespace, room, id) => {
  utils.log(room, getUserName(room, id), 'Disconnected');
  if (_.get(data, `${room}.${id}.isAdmin`)) {
    emitBoot(namespace, 'Admin left');
  }
  _.unset(data, `${room}.${id}`);
  if (isEmptyRoom(room)) {
    removeRoom(room);
  }
};

const castVote = (room, id, vote) => {
  _.set(data, `${room}.${id}.vote`, vote);
  utils.log(room, getUserName(room, id), `${getUserName(room, id)} voted ${getUserVote(room, id)}`);
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
      castVote(room, socket.id, vote);
      emitUpdate(namespace, room);
    });

    socket.on('disconnect', (reason) => {
      removeUser(namespace, room, socket.id);
      emitUpdate(namespace, room);
    });
  });
};
module.exports.init = init;
