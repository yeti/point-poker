import React from 'react';

export default class NoMatch extends React.Component {

  render() {
    return (
      <div className="NoMatch app__view">
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
