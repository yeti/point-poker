import React from 'react';
import _ from 'lodash';
import Header from './header.js';

export default class Layout extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="App__header">
          <Header />
        </div>
        <div className="App__content">
          {this.props.children}
        </div>
      </div>
    );
  }
}
