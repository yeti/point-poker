import React from 'react';
import Logo from './logo';

export default class Brand extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={'Brand'}>
        <div className={'Brand__logo'}>
          <Logo />
        </div>
        <div className={'Brand__name'}>
          {'Point Poker'}
        </div>
      </div>
    );
  }
}
