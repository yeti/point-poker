import React from 'react';
import { IndexLink } from 'react-router';
import Logo from '../brand/logo';

import './_header.scss';

export default class Header extends React.Component {

  render() {
    return (
      <div className="Header">
        <IndexLink to="/" className="Header__brand">
          <span className="Header__brand__logo" >
            <Logo />
          </span>
          <span className="Header__brand__name" >
            {'Point Poker'}
          </span>
        </IndexLink>
        <div className="Header__links">

        </div>
      </div>
    );
  }
}
