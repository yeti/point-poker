import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classwrap from 'classwrap';
// import Star from 'react-feather/dist/icons/star'; // include icon directly to save on import size

import './_PlayingCard.scss';

class PlayingCard extends Component {

  render() {
    const {
      className,
      value,
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

    const content = (
      <div className="PlayingCard__Content">
        <div className="PlayingCard__Value">
          {value}
        </div>
      </div>
    );

    return (
      <div className={classNames} onClick={onClick}>
        <div className="PlayingCard__Container">
          <div className="PlayingCard__Side PlayingCard__Side--front">
            <div className="PlayingCard__Row PlayingCard__Row--top">
              {content}
            </div>
            <div className="PlayingCard__Row PlayingCard__Row--bottom">
              {content}
            </div>
          </div>
          <div className="PlayingCard__Side PlayingCard__Side--back">
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
