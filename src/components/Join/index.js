import React from 'react';
import { browserHistory } from 'react-router';

import { sample } from 'utils';
import Button from 'components/Button';
import Form from 'components/Form';
import View from 'components/View';
import './_Join.scss';

export default class Join extends React.Component {

  get placeholderCode() {
    return 'Session Code';
  }

  get title() {
    return 'Join Existing Session';
  }

  get subtitle() {
    return '(or paste in the code of the room you want to join)';
  }

  navigate(room = this.generateRoom()) {
    browserHistory.push(`/join/${room}/?`);
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
      <View className="Join">
        <div className="Join__Layout">
          <Button onClick={() => this.navigate()}>
            Start New Session
          </Button>
          <Form
            className="Join__Form"
            onSubmit={room => this.navigate(room)}
            onBack={browserHistory.goBack}
            backLabel="Back"
            placeholderCode
            submitLabel="Join"
            placeholder={this.placeholderCode}
            label={this.title}
            valueTransform={value => (value && value.toUpperCase())}
          />
        </div>
      </View>
    );
  }
}
