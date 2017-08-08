'use strict';

const port = 4200;

const io = require('socket.io').listen(port);
const ioClient = require('socket.io-client');
const socket = require('../lib/socket');
const chai = require('chai')
const _ = require('lodash');

const expect = chai.expect;
chai.should();

describe('Server', () => {

  describe('API', () => {

    it('should serve routes');

  });

  describe('sockets', () => {

    const socketURL = `http://0.0.0.0:${port}`;
    const socketOptions ={
      transports: ['websocket'],
      'force new connection': true
    };

    const createClient = () => ioClient.connect(socketURL, socketOptions);

    const authenticate = (client, room, user) => {
      return new Promise((resolve, reject) => {
        client.on('authenticate', (data, callback) => {
          callback({
            room,
            user,
          });
          resolve();
        });
      });
    };

    const getData = () => socket.getData();

    const getRoom = (room) => {
      return _.get(getData(), room);
    }

    const getUserData = (room, id) => {
      return _.get(getRoom(room), id);
    };

    const isAdmin = (room, id) => {
      return _.get(getUserData(room, id), 'isAdmin');
    };

    const getUserName = (room, id) => {
      return _.get(getUserData(room, id), 'user');
    };

    const getUserId = (room, id) => {
      return _.get(getUserData(room, id), 'id');
    };

    const getVote = (room, id) => {
      return _.get(getUserData(room, id), 'vote');
    };

    before(() => {
      socket.init(io);
    });

    beforeEach(() => {

    });

    afterEach(() => {
      socket.resetData();
    });

    it('should have no data on load', () => {
      socket.getData().should.be.empty;
    });

    it('should prompt authentication on connect', (done) => {
      const client = createClient();

      client.on('authenticate', (data, callback) => {
        done();
      });
    });

    it('should add users on authenticate', (done) => {
      const client1 = createClient();
      const client2 = createClient();
      const client3 = createClient();

      Promise.all([
        authenticate(client1, 'room A', 'user 1'),
        authenticate(client2, 'room A', 'user 2'),
        authenticate(client3, 'room B', 'user 3'),
      ]).then(() => {

        setTimeout(() => {

          // Check both rooms are created
          socket.getData().should.have.all.keys(['room A', 'room B']);

          // Check rooms have the right socket ids registered
          getRoom('room A').should.have.all.keys([client1.id, client2.id]);
          getRoom('room B').should.have.all.keys([client3.id]);

          // Check users have the right data associated
          getUserData('room A', client1.id).should.have.all.keys(['user', 'isAdmin', 'vote', 'id']);
          getUserName('room A', client1.id).should.equal('user 1');
          isAdmin('room A', client1.id).should.equal(true);
          expect(getVote('room A', client1.id)).to.be.null;
          getUserId('room A', client1.id).should.equal(client1.id);

          getUserData('room A', client2.id).should.have.all.keys(['user', 'isAdmin', 'vote', 'id']);
          getUserName('room A', client2.id).should.equal('user 2');
          isAdmin('room A', client2.id).should.equal(false);
          expect(getVote('room A', client2.id)).to.be.null;
          getUserId('room A', client2.id).should.equal(client2.id);

          getUserData('room B', client3.id).should.have.all.keys(['user', 'isAdmin', 'vote', 'id']);
          getUserName('room B', client3.id).should.equal('user 3');
          isAdmin('room B', client3.id).should.equal(true);
          expect(getVote('room B', client3.id)).to.be.null;
          getUserId('room B', client3.id).should.equal(client3.id);

          done();
        }, 100);
      }).catch((e) => { console.dir(e) });
    });

    it('should remove user on disconnect', (done) => {
      const client1 = createClient();
      const client2 = createClient();
      const client3 = createClient();

      Promise.all([
        authenticate(client1, 'room A', 'user 1'),
        authenticate(client2, 'room A', 'user 2'),
        authenticate(client3, 'room B', 'user 3'),
      ]).then(() => {

        setTimeout(() => {

          client1.disconnect();

          setTimeout(() => {
            getRoom('room A').should.have.all.keys([client2.id]);

            client2.disconnect();

            setTimeout(() => {
              expect(getRoom('room A')).to.be.undefined;

              // Check both rooms are created
              getData().should.have.all.keys(['room B']);

              client3.disconnect();

              setTimeout(() => {
                expect(getData()).to.be.empty;
                done();
              }, 100);
            }, 100);
          }, 100);
        }, 100);
      }).catch((e) => { console.dir(e) });
    });

    it('should grant admin privileges to first person to join', () => {
      const client1 = createClient();
      const client2 = createClient();

      Promise.all([
        authenticate(client1, 'room A', 'user 1'),
        authenticate(client2, 'room A', 'user 2'),
      ]).then(() => {

        setTimeout(() => {
          isAdmin('room A', client1.id).should.equal(true);
          client1.disconnect();

          setTimeout(() => {

            const client3 = createClient();
            authenticate(client3, 'room A', 'new guy').then(() => {

              setTimeout(() => {
                isAdmin('room A', client2.id).should.equal(false);
                isAdmin('room A', client3.id).should.equal(true);
                done();
              }, 100);
            });
          }, 100);
        }, 100);
      }).catch((e) => { console.dir(e) });
    });

    it('should reset room on reset', () => {
      const client1 = createClient();
      const client2 = createClient();
      const client3 = createClient();

      Promise.all([
        authenticate(client1, 'room A', 'user 1'),
        authenticate(client2, 'room A', 'user 2'),
        authenticate(client3, 'room B', 'user 3'),
      ]).then(() => {
        setTimeout(() => {
          client1.emit('reset');

          setTimeout(() => {
            expect(getRoom('Room A').to.be.empty);
            expect(getRoom('Room B').to.not.be.empty);
            done();
          }, 100);
        }, 100);
      });
    });

    it('should register data on vote', () => {
      const client1 = createClient();
      const client2 = createClient();
      const client3 = createClient();

      Promise.all([
        authenticate(client1, 'room A', 'user 1'),
        authenticate(client2, 'room A', 'user 2'),
        authenticate(client3, 'room A', 'user 3'),
      ]).then(() => {
        setTimeout(() => {
          client1.vote('bim');
          client2.vote('bam');
          client3.vote('boom');

          setTimeout(() => {
            expect(getVote('Room A', client1.id).to.equal('bim'));
            expect(getVote('Room A', client2.id).to.equal('bam'));
            expect(getVote('Room A', client3.id).to.equal('boom'));
            done();
          }, 100);
        }, 100);
      });
    });

  });
});
