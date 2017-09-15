import React from 'react';
import PropTypes from 'prop-types';
import classwrap from 'classwrap';

import './_View.scss';

class View extends React.Component {
  render() {
    const {
      className,
    } = this.props;

    const classNames = classwrap([
      'View',
      className,
    ]);

    return (
      <div className={classNames}>
        {this.props.children}
      </div>
    );
  }
}

View.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  className: PropTypes.string,
};

export default View;
