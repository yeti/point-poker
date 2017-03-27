import React from 'react';

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
        <label>{'Username'}</label>
        <input
          type="text"
          value={this.state.name}
          onChange={(e) => { this.handleNameChange(e); } }
        />
        {this.hasValidName() &&
          <a
            href={`/${this.getRoomId()}/${this.state.name}`}
          >
            Go
          </a>
        }
      </div>
    );
  }
}
