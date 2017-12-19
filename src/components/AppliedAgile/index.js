import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classwrap from 'classwrap';

import './_AppliedAgile.scss';

class AppliedAgile extends Component {

  render() {
    const {
      className,
    } = this.props;

    const classNames = classwrap(
      [
        'AppliedAgile',
        className,
      ],
    );

    return (
      <img className={classNames} src="/images/applied_agile.svg" />
    );
  }
}

AppliedAgile.propTypes = {
  className: PropTypes.string,
};

AppliedAgile.defaultProps = {};

export default AppliedAgile;
