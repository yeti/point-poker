import React from 'react';

export default class Logo extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const suit = '♠';
    const value = '?';
    return (
      <div className={'Logo'}>
        <div className={'Logo__card'}>
          <div className={'Logo__card__suit'}>
            {suit}
          </div>
          <div className={'Logo__card__value Logo__card__value--top'}>
            {value}
          </div>
          <div className={'Logo__card__value Logo__card__value--bottom'}>
            {value}
          </div>
        </div>
      </div>
    );
  }
}
