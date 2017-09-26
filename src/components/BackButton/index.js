import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classwrap from 'classwrap';
import { browserHistory } from 'react-router';
import ArrowLeft from 'react-feather/dist/icons/arrow-left'; // include icon directly to save on import size

import './_BackButton.scss';

class BackButton extends Component {

  render() {
    const {
      className,
      label,
      onClick,
    } = this.props;

    const classNames = classwrap([
      'BackButton',
      className,
    ]);

    return (
      <div className={classNames} onClick={onClick}>
        <div className="BackButton__Icon">
          <ArrowLeft size="9"/>
        </div>
        <div className="BackButton__Label">
          {label}
        </div>
      </div>
    );
  }
}

BackButton.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func,
};

BackButton.defaultProps = {
  label: 'Back',
  onClick: browserHistory.goBack,
};

export default BackButton;
