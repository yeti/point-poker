import React from 'react';
import Dropdown from 'react-dropdown';

import './_dropdown.scss';

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

  getTiles() {
    return ['0', '1/2', '1', '2', '3', '5', '8', '13', '20', '40', '100', '?', '∞', '☕'];
  }

  onClick(option) {
    console.dir(option); // eslint-disable-line

    const vote = option.value;

    this.setState({
      vote,
    });

    this.props.socket.emit('vote', vote);
  }

  render() {
    return (
      <Dropdown
        options={this.getTiles()}
        onChange={option => this.onClick(option)}
        value={this.state.vote}
        placeholder="Select an option"
      />
    );
  }
}
