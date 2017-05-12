import React from 'react';
import _ from 'lodash';
import { IndexLink, Link } from 'react-router';

let className = 'Header__links__item';
let activeClassName = 'Header__links__item--active';

export default class Header extends React.Component {

  render() {
    return (
      <div className="Header">
        <IndexLink to="/" className="Header__brand">
          <span className="Header__brand__name" >
            {'Point Poker'}
          </span>
        </IndexLink>
        <div className="Header__links">
          <IndexLink to="/" className={className} activeClassName={activeClassName}>
            <span>Home</span>
          </IndexLink>
          <Link to="/about" className={className} activeClassName={activeClassName}>
            <span>About</span>
          </Link>
          <Link to="/contact" className={className} activeClassName={activeClassName}>
            <span>Contact</span>
          </Link>
        </div>
      </div>
    );
  }
}
