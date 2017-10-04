import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classwrap from 'classwrap';

import './_Button.scss';

class Button extends Component {

  render() {
    const {
      buttonType,
      className,
      children,
      disabled,
      type,
      onClick,
    } = this.props;

    const classNames = classwrap(
      [
        'Button',
        `Button--${buttonType}`,
        className,
      ],
    );

    return (
      <button className={classNames} onClick={onClick} type={type} disabled={disabled}>
        {children}
      </button>
    );
  }
}

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  className: PropTypes.string,
  type: PropTypes.string,
  buttonType: PropTypes.oneOf(['default', 'primary']),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  buttonType: 'default',
};

export default Button;
