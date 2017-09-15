import React from 'react';
import { IndexLink } from 'react-router';

import Brand from './Brand';
import './_Header.scss';

export default class Header extends React.Component {

  render() {
    return (
      <div className="Header">
        <IndexLink to="/">
          <Brand className="Header__brand" />
        </IndexLink>
        <div className="Header__links"></div>
      </div>
    );
  }
}
