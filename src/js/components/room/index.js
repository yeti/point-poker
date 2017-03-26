import React from 'react';
import io from 'socket.io-client';
import _ from 'lodash';

import Votes from './votes';
import Tiles from './tiles';

export default class Room extends React.Component {

  constructor(props) {
    super(props);

    console.dir(`Room ${this.getRoomId()}`);

    this.socket = io(`/${this.getRoomId()}`);

    this.state = {
      value: '',
      votes: {},
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
      });
    });

    this.socket.on('update', (data) => {
      console.dir(data);

      this.setState({
        votes: data,
      });
    });
  }

  generateName() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let name = '';
    for (let i = 0; i < 4; i += 1) {
      name += _.sample(alphabet);
    }
    return name;
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
    );
  }
}
