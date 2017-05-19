import React from 'react';
import JoinLink from '../joinLink';
import {LOCAL_STORAGE_KEYS} from '../../utils/constants';
import { browserHistory, Link} from 'react-router';

export default class Auth extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      name: window.localStorage.getItem(LOCAL_STORAGE_KEYS.USERNAME) || '',
    };

    window.browserHistory = browserHistory;
  }

  componentDidMount(){
    this.nameInput.focus();
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

  get placeholderName() {
    return 'James Bond';
  }

  navigate() {
    browserHistory.push(`${this.state.name}/`);
  }

  render() {
    return (
      <div className="Auth App__content__view">
        <div >
          <div
            className="Auth__form"
          >
            <label
              className="Auth__form__label"
              for="name"
            >
              {'What\'s your name?'}
            </label>
            <input
              className="Auth__form__input"
              id="name"
              type="text"
              placeholder={this.placeholderName}
              value={this.state.name}
              onChange={(e) => { this.handleNameChange(e); }}
              ref={(input) => { this.nameInput = input; }}
              maxLength="10"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
            />
            <span className="Auth__form__actions">
              <a
                className="Auth__form__btn Auth__form__btn--back"
                onClick={browserHistory.goBack}
              >
                <span className="icon-left-open icon-on-left" />
                {'Back'}
              </a>
              <Link to={`/join/${this.getRoomId()}/${this.state.name}`} className="Auth__form__btn Auth__form__btn--enter" disabled={!this.hasValidName()}>
                {'Enter'}
                <span className="icon-right-open" />
              </Link>
            </span>
          </div>
        </div>
      </div>
    );
  }
}
