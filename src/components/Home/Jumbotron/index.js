import React from 'react';
import PropTypes from 'prop-types';
import classwrap from 'classwrap';

import Logo from 'components/Logo';
import Button from 'components/Button';
import './_Jumbotron.scss';

class Jumbotron extends React.Component {

  render() {
    const {
      className,
      onClick,
    } = this.props;

    const classNames = classwrap([
      'Jumbotron',
      className,
    ]);

    return (
      <div className={classNames}>
        <Logo className="Jumbotron__logo" size="large"/>
        <div className="Jumbotron__headline">
          Point Poker
        </div>
        <div className="Jumbotron__subtitle">
          Estimate story points for your next sprint
        </div>
        <div className="Jumbotron__cta">
          <Button
            buttonType="primary"
            className="Jumbotron__button"
            onClick={onClick}
          >
            Get Started
          </Button>
        </div>
      </div>
    );
  }
}

Jumbotron.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default Jumbotron;
