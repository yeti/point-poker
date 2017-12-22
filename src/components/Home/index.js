import React from 'react';
import { browserHistory } from 'react-router';

import View from 'components/View';
import Jumbotron from './Jumbotron';
import './_Home.scss';

export default class Home extends React.Component {

  navigateToGetStarted() {
    browserHistory.push('/start/');
  }

  render() {
    return (
      <View className="Home">
        <Jumbotron className="Home__Jumbotron" onClick={() => this.navigateToGetStarted() } />
      </View>
    );
  }
}
