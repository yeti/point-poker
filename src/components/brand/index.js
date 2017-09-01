import React from 'react';
import Logo from './logo';

import './_brand.scss';

export default class Brand extends React.Component {

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
