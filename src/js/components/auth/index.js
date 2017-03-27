import React from 'react';
import JoinLink from '../joinLink';

export default class Home extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
    };
  }

  handleNameChange(event) {
    this.setState({
      name: event.target.value,
    });
  }

  getRoomId() {
    return this.props.params.room;
  }

  hasValidName() {
    return this.state.name !== '';
  }

  render() {
    return (
      <div className="Auth">
        <form method="get" action={`/${this.getRoomId()}/${this.state.name}`}>
          <label>{'Username'}</label>
          <input
            type="text"
            value={this.state.name}
            onChange={(e) => { this.handleNameChange(e); } }
          />
          {this.hasValidName() &&
            <button type="submit"
              href={`/${this.getRoomId()}/${this.state.name}`}
            >
              Go
            </button>
          }
        </form>
        <JoinLink
          room={this.getRoomId()}
        />
      </div>
    );
  }
}
