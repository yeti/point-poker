import React from 'react';
import PropTypes from 'prop-types';
import classwrap from 'classwrap';

import AppliedAgile from 'components/AppliedAgile';
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
        <Logo className="Brand__Logo" />
        <div className="Brand__Text">
          <AppliedAgile className="Brand__AppliedAgile"/>
          <span className="Brand__Name" >
            Points Poker
          </span>
        </div>
      </span>
    );
  }
}

Brand.propTypes = {
  className: PropTypes.string,
};

export default Brand;
