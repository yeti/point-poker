import React from 'react';
import _ from 'lodash';
import { browserHistory } from 'react-router';

import View from 'components/View';
import Jumbotron from './Jumbotron';
import './_Home.scss';

export default class Home extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      room: '',
    };
  }

  generateRoomCode() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let name = '';
    for (let i = 0; i < 4; i += 1) {
      name += _.sample(alphabet);
    }
    return name;
  }

  handleRoomChange(event) {
    this.setState({
      room: event.target.value.toUpperCase(),
    });
  }

  navigateToRoom(roomCode = this.generateRoomCode().toUpperCase()) {
    browserHistory.push(`/join/${roomCode}`);
  }

  render() {
    return (
      <View className="Home">
        <Jumbotron className="Home__Jumbotron" onClick={() => this.navigateToRoom('') } />
      </View>
    );
  }
}
