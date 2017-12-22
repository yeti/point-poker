import React from 'react';
import PropTypes from 'prop-types';
import classwrap from 'classwrap';

import AppliedAgile from 'components/AppliedAgile';
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
        <Logo className="Jumbotron__Logo" />
        <AppliedAgile className="Jumbotron__AppliedAgile" />
        <div className="Jumbotron__Headline">
          Points Poker
        </div>
        <div className="Jumbotron__Subtitle">
          Estimate story points for your next sprint
        </div>
        <div className="Jumbotron__CTA">
          <Button
            buttonType="primary"
            className="Jumbotron__Button"
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
