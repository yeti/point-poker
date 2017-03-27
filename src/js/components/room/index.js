import React from 'react';
import io from 'socket.io-client';

import Votes from './votes';
import Tiles from './tiles';

export default class Room extends React.Component {

  constructor(props) {
    super(props);

    console.dir(`Room ${this.getRoomId()}`);

    this.socket = io(`/${this.getRoomId()}`);

    console.dir(this.socket);

    this.state = {
      value: '',
      votes: {},
      isAdmin: false,
      connected: false,
      disconnected: false,
    };

    this.socket.on('connect', () => {
      this.setState({
        connected: true,
      });
    });

    this.socket.on('disconnect', () => {
      this.setState({
        disconnected: true,
        connected: false,
      });
    });

    this.socket.on('update', (data) => {
      console.dir(data);

      this.setState({
        votes: data,
      });
    });

    this.socket.on('You are admin', (data) => {
      this.setState({
        isAdmin: true,
      });
    });

    this.socket.on('boot', (data) => {
      this.socket.disconnect();
    });
  }

  getRoomId() {
    return this.props.params.room;
  }

  getUsername() {
    return this.props.params.user;
  }

  render() {
    return (
      <div className="App">
        {this.state.connected &&
          <div>
            <div className="App__room">
              {`Room: ${this.getRoomId()}`}
            </div>
            <div className="App__name">
              {`Name: ${this.getUsername()}`}
            </div>
            <div className="App__content">
              <Tiles
                socket={this.socket}
                userName={this.getUsername()}
              />
              <Votes
                votes={this.state.votes}
                isRevealed={false}
              />
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
