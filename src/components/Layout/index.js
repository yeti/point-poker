import React from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import './_Layout.scss';

class Layout extends React.Component {

  render() {
    return (
      <div className="Layout">
        <div className="Layout__header">
          <Header code={this.props.params.room}/>
        </div>
        <div className="Layout__content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  className: PropTypes.string,
};

export default Layout;
