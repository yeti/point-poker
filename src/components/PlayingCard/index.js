import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classwrap from 'classwrap';
import Logo from 'components/Logo';

import './_PlayingCard.scss';

class PlayingCard extends Component {

  get filePath() {
    return `/images/cards/f-${this.props.value}.svg`;
  }

  render() {
    const {
      className,
      hidden,
      onClick,
    } = this.props;

    const classNames = classwrap(
      [
        'PlayingCard',
        {
          PlayingCard: {
            '--hidden': hidden,
            '--shown': !hidden,
          },
        },
        className,
      ],
    );

    return (
      <div className={classNames} onClick={onClick}>
        <div className="PlayingCard__Container">
          <div className="PlayingCard__Side PlayingCard__Side--front">
            <img src={this.filePath} className="PlayingCard__Image"/>
          </div>
          <div className="PlayingCard__Side PlayingCard__Side--back">
            <Logo className="PlayingCard__Logo" />
          </div>
        </div>
      </div>
    );
  }
}

PlayingCard.propTypes = {
  className: PropTypes.string,
  hidden: PropTypes.bool,
  value: PropTypes.string,
  onClick: PropTypes.func,
};

PlayingCard.defaultProps = {
  onClick: () => {},
};

export default PlayingCard;
