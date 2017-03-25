import React from 'react';
import io from 'socket.io-client';
import _ from 'lodash';

import Messages from './messages';
import Tiles from './tiles';

export class App extends React.Component {

  constructor(props) {
    super(props);

    this.socket = io(`/${this.getRoomId()}`);

    this.name = this.generateName();

    this.state = {
      messages: {},
    };

    this.socket.on('chat message', (msg) => {
      console.dir(msg);
      const messages = this.state.messages;

      const user = msg.userName;
      const value = msg.current;

      messages[user] = value;

      this.setState({
        messages,
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
    const url = window.location.href;
    const id = url.split('/')[url.split('/').length - 1];

    return id;
  }

  getName() {
    const url = window.location.href;
    const id = url.split('/')[url.split('/').length - 1];

    return id;
  }

  onClick() {
    this.socket.emit('chat message', this.generateName());
  }

  render() {
    return (
      <div className="App">
        <div className="App__room">
          {`Room: ${this.getRoomId()}`}
        </div>
        <div className="App__username">
          {`Username: ${this.name} `}
        </div>
        <Tiles
          socket={this.socket}
          userName={this.name}
        />
        <Messages
          messages={this.state.messages}
        />
      </div>
    );
  }
}
