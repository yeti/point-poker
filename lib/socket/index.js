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

const createRoom = (room) => {
  if (!_.get(data, `${room}`)) {
    _.set(data, `${room}`, {});
  }
}

const createUser = (room, id, user) => {
  _.set(data, `${room}.${id}`, {
    user,
    vote: null,
  });
  utils.log(room, getUserName(room, id), 'Connected');
};

const isEmptyRoom = (room) => {
  return _.keys(data[room]).length === 0;
}

const removeRoom = (room) => {
  _.unset(data, `${room}`);
}

const removeUser = (room, id) => {
  utils.log(room, getUserName(room, id), 'Disconnected');
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

  createRoom(room);

  namespace.on('connection', (socket) => {
    createUser(room, socket.id, user);
    emitUpdate(namespace, room);

    socket.on('cast vote', (vote) => {
      castVote(room, socket.id, vote);
      emitUpdate(namespace, room);
    });

    socket.on('disconnect', (reason) => {
      removeUser(room, socket.id);
      emitUpdate(namespace, room);
    });
  });
};
module.exports.init = init;
