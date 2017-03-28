import React from 'react';
import io from 'socket.io-client';

import Votes from './votes';
import Tiles from './tiles';
import JoinLink from '../joinLink';

export default class Room extends React.Component {

  constructor(props) {
    super(props);

    console.dir(`Room ${this.getRoomId()}`);

    this.state = {
      value: '',
      votes: {},
      isAdmin: false,
      connected: false,
      disconnected: false,
      isRevealed: false,
    };

    this.socket = io('/');//io(`/${this.getRoomId()}`);

    this.socket.on('connect', (client) => {
      console.dir('connect');
      this.setState({
        connected: true,
        disconnected: false,
        client,
      });
    });

    this.socket.on('disconnect', () => {
      this.setState({
        disconnected: true,
        connected: false,
      });
    });

    this.socket.on('update', (data) => {
      console.dir('[[[[[[]]]]]]');
      console.dir(data);

      this.setState({
        votes: data,
      });
    });

    this.socket.on('You are admin', (isAdmin) => {
      this.setState({
        isAdmin,
      });
    });

    this.socket.on('boot', () => {
      this.socket.disconnect();
    });

    this.socket.on('reveal', (isRevealed) => {
      this.setState({
        isRevealed,
      });
    });

    this.socket.on('reset', (isRevealed) => {
      this.setState({
        isRevealed: false,
      });
      console.dir('reset 2')
    });

    this.socket.on('authenticate', (data, callback) => {
      console.dir(data);
      console.dir('authenticating');
      callback({
        room: this.getRoomId(),
        user: this.getUsername(),
      });
    });

  }

  getRoomId() {
    return this.props.params.room;
  }

  getUsername() {
    return this.props.params.user;
  }

  onClickReveal() {
    this.socket.emit('reveal', !this.state.isRevealed);
  }

  onClickNext() {
    this.socket.emit('reset', true);
  }

  render() {
    return (
      <div className="App">
        {this.state.connected &&
          <div>
            <div className="App__name">
              {`Welcome ${this.getUsername()}`}
            </div>
            <div className="App__room">
              <JoinLink
                room={this.getRoomId()}
              />
            </div>
            <div className="App__content">
              <Tiles
                onVote={this.state.onVote}
                socket={this.socket}
                user={this.getUsername()}
                room={this.getRoomId()}
              />
              <Votes
                votes={this.state.votes}
                isRevealed={this.state.isRevealed}
              />
              {this.state.isAdmin &&
                <div>
                  <a
                    className="btn"
                    onClick={() => { this.onClickReveal(); } }
                  >
                    Reveal
                  </a>
                  <a
                    className="btn"
                    onClick={() => { this.onClickNext(); } }
                  >
                    Next
                  </a>
                </div>
              }
            </div>
          </div>
        }
        {this.state.disconnected &&
          <div>
            {'Disconnected '}
            <a href="">Reconnect</a>
          </div>
        }
        {!this.state.disconnected && !this.state.connected &&
          <div>{'Connecting'}</div>
        }
      </div>
    );
  }
}
