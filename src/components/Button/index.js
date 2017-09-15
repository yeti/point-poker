import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classwrap from 'classwrap';

import './_Button.scss';

class Button extends Component {

  render() {
    const {
      className,
      children,
      type,
      onClick,
    } = this.props;

    const classNames = classwrap(
      [
        'Button',
        `Button--${type}`,
        className,
      ],
    );

    return (
      <span className={classNames} onClick={onClick}>
        {children}
      </span>
    );
  }
}

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  className: PropTypes.string,
  type: PropTypes.oneOf(['default', 'primary']),
  onClick: PropTypes.func,
};

Button.defaultProps = {
  type: 'default',
};

export default Button;
