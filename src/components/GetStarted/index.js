import React from 'react';
import { browserHistory } from 'react-router';

import { sample } from 'utils';
import Button from 'components/Button';
import View from 'components/View';
import BackButton from 'components/BackButton';
import './_GetStarted.scss';

export default class GetStarted extends React.Component {
  navigateToRoom(room = this.generateRoom()) {
    browserHistory.push(`/join/${room}`);
  }

  generateRoom(length = 4) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let room = '';

    for (let i = 0; i < length; i += 1) {
      room += sample(alphabet);
    }

    return room;
  }

  render() {
    return (
      <View className="GetStarted">
        <div className="GetStarted__Layout">
          <BackButton className="GetStarted__BackButton" />
          <div className="GetStarted__Title">
            Get Started
            <div className="GetStarted__Subtitle">
              Choose an option below
            </div>
          </div>
          <div className="GetStarted__Options">
            <Button
              className="GetStarted__Option GetStarted__Option--New"
              onClick={() => this.navigate(this.navigateToRoom())}
            >
              Create New Session
            </Button>
            <div className="GetStarted__Option GetStarted__Option--Or">
              Or
            </div>
            <Button
              className="GetStarted__Option GetStarted__Option--Existing"
              onClick={() => this.navigate(this.navigateToRoom(''))}
            >
              Join Existing Session
            </Button>
          </div>
        </div>
      </View>
    );
  }
}
