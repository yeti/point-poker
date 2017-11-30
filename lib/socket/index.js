
const _ = require('lodash');

const prettyJson = require('prettyjson');
const gifs = require('../gifs');

const data = {};
const stickerTimeout = 5000;
const stickerTimers = {};

module.exports.init = (io) => {
  const getVotes = (room) => {
    return _.map(_.keys(_.get(data, room)), id => (
      _.get(data, [room, id])
    ));
  };

  const everyoneVoted = (room) => {
    let isTrue = true;
    _.forEach(_.keys(_.get(data, room)), (key) => {
      if (!_.get(data, [room, key, 'vote'])) {
        isTrue = false;
      }
    });
    return isTrue;
  };

  const checkComplete = (room) => {
    io.to(room).emit('reveal', everyoneVoted(room));
  };

  const emit = (room, eventName, value) => {
    io.to(room).emit(eventName, value);
  };

  const emitUpdate = (room) => {
    emit(room, 'update', getVotes(room));
    checkComplete(room);
    console.log('-_-_-_-_-_-_-_-'); // eslint-disable-line no-console
    console.log(prettyJson.render(data, { // eslint-disable-line no-console
      keysColor: 'blue',
      stringColor: 'red',
    }));
  };

  const givePrivileges = (id, isAdmin) => {
    io.to(id).emit('You are admin', isAdmin);
  };

  const createUser = (room, id, user) => {
    _.set(data, [room, id], {
      user,
      vote: null,
      isAdmin: true,
      id,
    });
    givePrivileges(id, true);
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

  const setSticker = (socket, sticker) => {
    _.set(data, [getRoom(socket.id), socket.id, 'sticker'], sticker);
  };

  io.on('connect', (socket) => {
    socket.emit('authenticate', 'Who are you?', (creds) => {
      createUser(creds.room, socket.id, creds.user);
      socket.join(creds.room);
      emitUpdate(creds.room);
    });

    socket.on('vote', (vote) => {
      _.set(data, [getRoom(socket.id), socket.id, 'vote'], vote);
      emitUpdate(getRoom(socket.id));
    });

    socket.on('disconnect', () => {
      const room = getRoom(socket.id);
      removeUser(socket.id);
      emitUpdate(room);
    });

    socket.on('reveal', (value) => {
      emit(getRoom(socket.id), 'reveal', value);
    });

    socket.on('reset', () => {
      resetRoom(getRoom(socket.id));
      emitUpdate(getRoom(socket.id));
    });

    socket.on('reaction', (reaction) => {
      gifs.getRandomSticker(reaction)
        .then((sticker) => {
          if (sticker) { // If there is a sticker
            // Get potential timer
            let timer = _.get(stickerTimers, socket.id);

            // If timer exists, cancel it then delete it
            if (timer) {
              try {
                timer.clearTimeout();
              } catch (e) {
                // TODO figure this shit out
              }
              _.unset(stickerTimers, socket.id);
            }

            // Set sticker on user
            const image = _.get(sticker, 'images.fixed_width_small.url');
            setSticker(socket, image);
            emitUpdate(getRoom(socket.id));

            // Clear sticker after x amount of time
            timer = setTimeout(() => {
              setSticker(socket, null);
              emitUpdate(getRoom(socket.id));
            }, stickerTimeout);

            // Set timer
            _.set(stickerTimers, socket.id, timer);
          }
        }).catch((e) => {
          console.error(`Couldn't get reaction: ${e}`);
        });
    });
  });
};

module.exports.getData = () => data;
module.exports.resetData = () => {
  _.forEach(_.keys(data), (key) => {
    _.unset(data, key);
  });
};
