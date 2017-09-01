import React from 'react';

import './_logo.scss';

export default class Logo extends React.Component {
  render() {
    const suit = '♠';
    const value = '?';
    return (
      <div className="Logo">
        <div className="card">
          <div className="card__suit">
            {suit}
          </div>
          <div className="card__value card__value--top">
            {value}
          </div>
          <div className="card__value card__value--bottom">
            {value}
          </div>
        </div>
      </div>
    );
  }
}
