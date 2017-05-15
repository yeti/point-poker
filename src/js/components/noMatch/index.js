import React from 'react';
import _ from 'lodash';
import { browserHistory } from 'react-router';

export default class NoMatch extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="NoMatch App__content__view">
        <div className="NoMatch__copy">
          <div className="NoMatch__copy__title">
            {'404'}
          </div>
          <div className="NoMatch__copy__subtitle">
            {'Page not found'}
          </div>
        </div>
      </div>
    );
  }
}
