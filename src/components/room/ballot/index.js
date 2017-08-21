import React from 'react';
import PropTypes from 'prop-types';
import { VOTE_OPTIONS } from '../../../utils/constants';

const Card = ({ value, order, onClicked }) => (
  <div className="card" style={{ zIndex: order }} onClick={onClicked}>
    <div className="card__suit">♠</div>
    <div className="card__value card__value--top">{value}</div>
    <div className="card__value card__value--bottom">{value}</div>
  </div>
);

Card.propTypes = {
  value: PropTypes.any.isRequired,
  order: PropTypes.number.isRequired,
  onClicked: PropTypes.func.isRequired,
};

export default class Ballot extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      vote: null,
    };

    this.props.socket.on('reset', () => {
      this.setState({
        vote: null,
      });
    });
  }

  static propTypes = {
    socket: PropTypes.any.isRequired,
  }

  getTiles() {
    return VOTE_OPTIONS;
  }

  onClick = (vote) => {
    this.setState({
      vote,
    });

    this.props.socket.emit('vote', vote);
  }
  /*
  <Dropdown
    options={this.getTiles()}
    onChange={option => this.onClick(option)}
    value={this.state.vote}
    placeholder="Select an option"
  />
  */
  render() {
    return (
      <div className="Card__container">
        {
          this.getTiles().map((item, key) =>
            <Card value={item} key={key} order={key} onClicked={() => this.onClick(item)} />,
          )
        }
      </div>
    );
  }
}
