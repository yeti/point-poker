import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classwrap from 'classwrap';

import PlayingCard from 'components/PlayingCard';
import './_Hand.scss';

class Hand extends Component {

  constructor(props) {
    super(props);

    this.state = {
      value: null,
    };
  }

  componentDidMount() {
    this.props.socket.on('reset', () => {
      this.setState({
        value: null,
      });
    });
  }

  handlePlay(value) {
    const vote = value === this.state.value ? null : value;
    this.props.handleVote(vote);
    this.setState({
      value: vote,
    });
  }

  render() {
    const {
      className,
      cards,
    } = this.props;

    const {
      value,
    } = this.state;

    const classNames = classwrap(
      [
        'Hand',
        className,
      ],
    );

    return (
      <div className={classNames}>
        {cards.map((card, index) => (
          <PlayingCard
            className={classwrap(['Hand__Card', value === card && 'Hand__Card--active'])}
            isActive={value === card}
            key={index}
            onClick={() => this.handlePlay(card)}
            value={card}
          />
        ))}
      </div>
    );
  }
}

Hand.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.string),
  className: PropTypes.string,
  handleVote: PropTypes.func,
  socket: PropTypes.object.isRequired,
};

Hand.defaultProps = {
  cards: ['half', '1', '2', '3', '5', '8', '13', '20', '40', '100', 'idk', 'infinity', '☕'],
  className: null,
  handleVote: () => {},
};

export default Hand;
