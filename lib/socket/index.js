const _ = require('lodash');

const prettyJson = require('prettyjson');
const gifs = require('../gifs');

/**
 * All gameplay data is stored in this object:
 * data: {
 *   room1: {
 *     socketId1: {
 *       name: 'Dave',
 *       vote: '1',
 *       reaction: 'https://media.giphy.com/media/U5MozYUQYYTfy/giphy.gif',
 *     },
 *     socketId2: {...user data},
 *     socketId3: {...user data},
 *   },
 *   room2: {
 *     socketId4: {...user data},
 *     socketId5: {...user data},
 *   }
 * }
 */
const data = {};

/**
 * How long a reaction sticker sticks around for
 */
const stickerTimeout = 5000;

/**
 * Object to keep track of reaction sticker timers
 */
const stickerTimers = {};

/**
 * Debug flag
 */
const isInDebugMode = process.env.DEBUG === 'true';

/**
 * This function wires up all game logic to the SocketIO instance that is passed in
 * @param {object} io SocketIO instance.
 *                    This is hooked up to express. It listens to and emits socket events.
 */
module.exports.init = (io) => {
  /**
   * HELPERS
   */

  /**
   * Get all game data for a room
   * @param  {string} room  The room id
   * @return {Array}        Array of game data
   */
  const getVotes = (room) => {
    return _.map(_.keys(_.get(data, room)), id => (
      _.get(data, [room, id])
    ));
  };

  /**
   * Checks if everyone has voted in a room
   * @param  {string} room  The room id
   * @return {Array}        Whether everyone has voted or not
   */
  const everyoneVoted = (room) => {
    let isTrue = true;
    _.forEach(_.keys(_.get(data, room)), (key) => {
      if (!_.get(data, [room, key, 'vote'])) {
        isTrue = false;
      }
    });
    return isTrue;
  };

  /**
   * Emit a reveal event reflecting if everyone has voted
   * @param  {string} room The room id
   */
  const checkComplete = (room) => {
    io.to(room).emit('reveal', everyoneVoted(room));
  };

  /**
   * Boilerplate emitter function
   * @param  {string} room      The room id
   * @param  {string} eventName The event name
   * @param  {*}      value     The valu
   */
  const emit = (room, eventName, value) => {
    io.to(room).emit(eventName, value);
  };

  /**
   * Sends current room data to every client connected to a room
   * @param  {string} room      The room id
   */
  const emitUpdate = (room) => {
    emit(room, 'update', getVotes(room));
    checkComplete(room);
    if (isInDebugMode) {
      console.log('-_-_-_-_-_-_-_-'); // eslint-disable-line no-console
      console.log(prettyJson.render(data, { // eslint-disable-line no-console
        keysColor: 'blue',
        stringColor: 'red',
      }));
    }
  };

  /**
   * Grants admin givePrivileges to a user
   * @param  {string} id        The user's socket id
   * @param  {boolean} isAdmin  If the user is admin or not
   */
  const givePrivileges = (id, isAdmin) => {
    io.to(id).emit('You are admin', isAdmin);
  };

  /**
   * Initialize a new user
   * @param  {string} room  The room id
   * @param  {string} id    The user's socket id
   * @param  {object} user  The user's data
   */
  const createUser = (room, id, user) => {
    _.set(data, [room, id], {
      user,
      vote: null,
      isAdmin: true,
      id,
    });
    givePrivileges(id, true);
  };

  /**
   * Retrieve a user's room by user id
   * @param  {string} id  The user's socket id
   * @return              The user's room id
   */
  const getRoom = (id) => {
    let originRoom;
    _.forOwn(data, (value, room) => {
      if (_.has(data, [room, id])) {
        originRoom = room;
      }
    });
    return originRoom;
  };

  /**
   * Remove a user from the data store
   * @param  {string} id  The user's socket id
   */
  const removeUser = (id) => {
    const room = getRoom(id);
    _.unset(data, [room, id]);
    if (_.keys(_.get(data, room)).length === 0) {
      _.unset(data, room);
    }
  };

  /**
   * Reset the room's data - used at the end of a voting round
   * @param  {string} room  The room id
   */
  const resetRoom = (room) => {
    _.forEach(_.keys(_.get(data, room)), (key) => {
      _.set(data, [room, key, 'vote'], null);
    });
    emit(room, 'reset', true);
  };

  /**
   * Set a reaction sticker for a user
   * @param  {object} socket  The user's socket object
   * @param  {string} sticker The sticker URI
   */
  const setSticker = (socket, sticker) => {
    _.set(data, [getRoom(socket.id), socket.id, 'sticker'], sticker);
  };

  /**
   * EVENT LISTENERS
   */

  /**
   * Connect handler - when a user joins a room
   */
  io.on('connect', (socket) => {
    /**
     * Authentication flow - ask user for name and room
     */
    socket.emit('authenticate', 'Who are you?', (creds) => {
      createUser(creds.room, socket.id, creds.user);
      socket.join(creds.room);
      emitUpdate(creds.room);
    });

    /**
     * Vote handler - listen for user votes
     */
    socket.on('vote', (vote) => {
      _.set(data, [getRoom(socket.id), socket.id, 'vote'], vote);
      emitUpdate(getRoom(socket.id));
    });

    /**
     * Disconnect handler - listen for users leaving
     */
    socket.on('disconnect', () => {
      const room = getRoom(socket.id);
      removeUser(socket.id);
      emitUpdate(room);
    });

    /**
     * Reveal handler - listen for users manually triggering a card reveal
     */
    socket.on('reveal', (value) => {
      emit(getRoom(socket.id), 'reveal', value);
    });

    /**
     * Reset handler - listen for users triggering a room reset
     */
    socket.on('reset', () => {
      resetRoom(getRoom(socket.id));
      emitUpdate(getRoom(socket.id));
    });

    /**
     * Reaction handler - listen for users reacting
     */
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

/**
 * Test helpers
 */

// data getter - expose data for unit tests
module.exports.getData = () => data;

// data resetter - reset data for unit test teardown
module.exports.resetData = () => {
  _.forEach(_.keys(data), (key) => {
    _.unset(data, key);
  });
};
