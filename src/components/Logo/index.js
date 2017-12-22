import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classwrap from 'classwrap';

import './_Logo.scss';

class Logo extends Component {

  render() {
    const {
      className,
      size,
    } = this.props;

    const classNames = classwrap(
      [
        'Logo',
        `Logo--${size}`,
        className,
      ],
    );

    return (
      <span className={classNames}>
        <img className="Logo__Image" src="/images/yeti_logo.svg" />
      </span>
    );
  }
}

Logo.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

Logo.defaultProps = {
  size: 'medium',
};

export default Logo;
