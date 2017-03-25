import React from 'react';
import _ from 'lodash';

import Tile from './Tile';

export default class Tiles extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      tiles: ['0', '0.5', '1', '2', '3', '5', '8', '13', '20', '40', '100', '?'],
      vote: null,
    };
  }

  onClick(value) {
    let vote;

    if (value === this.state.vote) {
      vote = null;
    } else {
      vote = value;
    }

    this.setState({
      vote,
    });

    this.props.socket.emit('cast vote', {
      user: this.props.userName,
      value: vote,
    });
  }

  render() {
    return (
      <div className="Tiles">
        {
          _.map(this.state.tiles, tile => (
            <Tile
              value={ tile }
              onClick={() => { this.onClick(tile); } }
              isCurrent={tile === this.state.vote}
            />
          ))
        }
      </div>
    );
  }
}
