import React from 'react';
import _ from 'lodash';

import Tile from './Tile';

export default class Tiles extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      tiles: [0.5, 1, 2, 3, 5, 8],
      current: null,
    };
  }

  onClick(tile) {
    let current;

    if (tile === this.state.current) {
      current = null;
    } else {
      current = tile;
    }

    this.setState({
      current,
    });

    this.props.socket.emit('chat message', {
      userName: this.props.userName,
      current,
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
              isCurrent={tile === this.state.current}
            />
          ))
        }
      </div>
    );
  }
}
