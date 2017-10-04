import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classwrap from 'classwrap';

import PlayingCard from 'components/PlayingCard';

const toRadian = angleInDeg => angleInDeg * (Math.PI / 180);

const mapToPercentage = valueBetweenOneAndNegativeOne => (valueBetweenOneAndNegativeOne + 1) * 50;

class Seat extends Component {

  get offsetAngle() {
    return toRadian(this.props.offset);
  }

  // This is the angle to display the card at - it will be the opposite of the offset angle
  get cardAngle() {
    return this.offsetAngle + Math.PI;
  }

  // This is the distance between the top of the table and the seat
  get top() {
    const yComponent = Math.sin(this.offsetAngle);
    const percentageFromTop = mapToPercentage(yComponent);

    return `${percentageFromTop}%`;
  }

  // This is the distance between the left of the table and the seat
  get left() {
    const xComponent = Math.cos(this.offsetAngle);
    const percentageFromLeft = mapToPercentage(xComponent);

    return `${percentageFromLeft}%`;
  }

  // This is the distance to between the card and the seat
  get cardTranslateDistance() {
    return 75;
  }

  // This is the x component of the card translation (https://stackoverflow.com/questions/839899/how-do-i-calculate-a-point-on-a-circle-s-circumference)
  get cardTranslateX() {
    return this.cardTranslateDistance * Math.cos(this.cardAngle);
  }

  // This is the y component of the card translation (https://stackoverflow.com/questions/839899/how-do-i-calculate-a-point-on-a-circle-s-circumference)
  get cardTranslateY() {
    return this.cardTranslateDistance * Math.sin(this.cardAngle);
  }

  // This is the css friendly translation data string
  get cardTranslate() {
    return `translate(${this.cardTranslateX}px, ${this.cardTranslateY}px)`;
  }

  get noTranslate() {
    return 'translate(0px, 0px)';
  }

  render() {
    const {
      className,
      isRevealed,
      user,
    } = this.props;

    const classNames = classwrap(
      [
        'Seat',
        className,
      ],
    );

    const hasChosenCard = !!user.vote;
    const cardValue = hasChosenCard ? user.vote : '';
    const cardHidden = !isRevealed;
    const cardStyles = hasChosenCard
      ? {
        transform: `${this.cardTranslate} scale(1)`,
        opacity: 1,
      }
      : {
        transform: `${this.noTranslate} scale(0)`,
        opacity: 0,
      };


    return (
      <div className={classNames} style={{
        top: this.top,
        left: this.left,
      }}>
        <div className="Seat__Content">
          <div className="Seat__Name">
            {user.user}
          </div>
          <div className="Seat__CardsContainer" style={{}}>
            <div className="Seat__CardsWrapper" style={cardStyles}>
              <PlayingCard className="Seat__Cards" value={cardValue} hidden={cardHidden} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Seat.propTypes = {
  offset: PropTypes.number,
  className: PropTypes.string,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    user: PropTypes.string.isRequired,
    vote: PropTypes.any,
  }),
  value: PropTypes.number,
  isRevealed: PropTypes.bool,
};

Seat.defaultProps = {};

export default Seat;
