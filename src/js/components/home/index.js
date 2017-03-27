import React from 'react';
import _ from 'lodash';

export default class Home extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      room: '',
    };
  }

  generateRoomCode() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let name = '';
    for (let i = 0; i < 4; i += 1) {
      name += _.sample(alphabet);
    }
    return name;
  }

  handleRoomChange(event) {
    this.setState({
      room: event.target.value.toUpperCase(),
    });
  }

  render() {
    return (
      <div className="Home">
        <div className="Home__section Home__section--create">
            <a
              className="Home__section__btn btn"
              href={`/${this.generateRoomCode().toUpperCase()}`}
            >
              {'Create'}
            </a>
        </div>
        <div className="Home__section-separator">
          {'or'}
        </div>
        <div className="Home__section Home__section--join">
          <div className="Home__section__input-group">
            <div className="Home__section__input">
              <label>{'Room'}</label>
              <input
                type="text"
                value={this.state.room}
                onChange={(e) => { this.handleRoomChange(e); } }
              />
              <a
                href={`/${this.state.room.toUpperCase()}`}
              >
                {'Join'}
              </a>
            </div>
            {false &&
              <div className="Home__section__btn">
                {'Join'}
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}
