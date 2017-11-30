import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classwrap from 'classwrap';

import Seat from './Seat';
import './_Table.scss';

const isOdd = n => n % 2 === 1;

class Table extends Component {
  getSeatOffset(seatIndex, nSeats) {
    const adjustNSeats = isOdd(nSeats) ? nSeats + 1 : nSeats;
    const offsetAngle = 360 / adjustNSeats;
    const initialOffset = 90; // Offset of first seat

    return initialOffset + (seatIndex * offsetAngle);
  }

  render() {
    const {
      className,
      isRevealed,
    } = this.props;

    const classNames = classwrap([
      'Table',
      className,
    ]);

    return (
      <div className={classNames}>
        <div className="Table__Shape">
          <div className="Table__Seats">
            {this.props.users.map((user, index) =>
              <Seat
                offset={this.getSeatOffset(index, this.props.users.length)}
                key={index}
                user={user}
                isRevealed={isRevealed}
              />)
            }
          </div>
        </div>
      </div>
    );
  }
}

Table.propTypes = {
  className: PropTypes.string,
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    user: PropTypes.string.isRequired,
    sticker: PropTypes.string,
    vote: PropTypes.any,
  })),
  isRevealed: PropTypes.bool,
};

Table.defaultProps = {
  users: [],
};

export default Table;
