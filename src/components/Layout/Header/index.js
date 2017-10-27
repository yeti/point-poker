import React from 'react';
import PropTypes from 'prop-types';
import { IndexLink } from 'react-router';

import JoinLink from 'components/JoinLink';
import Brand from './Brand';
import './_Header.scss';

export default class Header extends React.Component {

  static get propTypes() {
    return {
      code: PropTypes.string,
    };
  }

  render() {
    const {
      code,
    } = this.props;

    return (
      <div className="Header">
        <IndexLink to="/">
          <Brand className="Header__brand" />
        </IndexLink>
        <div className="Header__links"></div>
        {code &&
          <JoinLink code={code} />
        }
      </div>
    );
  }
}
