import React from 'react';
import { browserHistory } from 'react-router';

import Form from 'components/Form';
import View from 'components/View';
import './_Join.scss';

export default class Join extends React.Component {

  get placeholderCode() {
    return 'ABCD';
  }

  get title() {
    return 'Please enter a room name';
  }

  navigate(room) {
    browserHistory.push(`/join/${room}/?`);
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
          submitLabel="Enter"
          placeholder={this.placeholderCode}
          label={this.title}
        />
      </View>
    );
  }
}
