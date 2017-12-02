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
        <div className="Brand__text">
          <span className="Brand__name" >
            points.poker
          </span>
          <span className="Brand__subtitle" >
            powered by
            <span className="Brand__subtitle-strong" >
              yeti.co
            </span>
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
