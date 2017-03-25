import React from 'react';
import _ from 'lodash';

export default class Home extends React.Component {

  constructor(props) {
    super(props);
  }

  generateRoomCode() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let name = '';
    for (let i = 0; i < 4; i += 1) {
      name += _.sample(alphabet);
    }
    return name;
  }

  render() {
    return (
      <div className="Home">
        <div className="Home__section Home__section--create">
          <div className="Home__section__btn">
            <a href={`/${this.generateRoomCode()}`}>{'Create'}</a>
          </div>
        </div>
        <div className="Home__section Home__section--join">
          <div className="Home__section__input-group">
            <div className="Home__section__input">
              {'Join'}
            </div>
            <div className="Home__section__btn">
              {'Join'}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
