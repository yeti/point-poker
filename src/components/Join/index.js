import React from 'react';
import { browserHistory } from 'react-router';

import { sample } from 'utils';
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
    return 'Please enter the session code below';
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
        <Form
          className="Join__Form"
          onSubmit={room => this.navigate(room)}
          onBack={browserHistory.goBack}
          backLabel="Back"
          placeholderCode
          submitLabel="Join"
          placeholder={this.placeholderCode}
          title={this.title}
          subtitle={this.subtitle}
          valueTransform={value => (value && value.toUpperCase())}
        />
      </View>
    );
  }
}
