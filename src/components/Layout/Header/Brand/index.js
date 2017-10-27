import React from 'react';
import PropTypes from 'prop-types';
import classwrap from 'classwrap';

import Logo from 'components/Logo';
import './_Brand.scss';

class Brand extends React.Component {

  render() {
    const {
      className,
    } = this.props;

    const classNames = classwrap([
      'Brand',
      className,
    ]);

    return (
      <span className={classNames}>
        <Logo className="Brand__logo" />
        <span className="Brand__name" >
          {'Point Poker'}
        </span>
      </span>
    );
  }
}

Brand.propTypes = {
  className: PropTypes.string,
};

export default Brand;
