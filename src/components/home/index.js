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

/*

<div className="Home__section__input-group">
  <div className="Home__section__input">
    <form method="get" action={`/${this.state.room.toUpperCase()}`}>
      <label>{'Room'}</label>
      <input
        type="text"
        value={this.state.room}
        onChange={(e) => { this.handleRoomChange(e); } }
      />
      <button type="submit">
        {'Join Existing Session'}
      </button>
    </form>
  </div>
  {false &&
    <div className="Home__section__btn">
      {'Join'}
    </div>
  }
</div>

*/
