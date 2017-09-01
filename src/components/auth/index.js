import React from 'react';
import { browserHistory } from 'react-router';
import _ from 'lodash';
import PropTypes from 'prop-types';

import { LOCAL_STORAGE_KEYS } from '../../utils/constants';

export default class Auth extends React.Component {
  static get propTypes() {
    return { params: PropTypes.any };
  }

  constructor(props) {
    super(props);

    this.state = {
      name: window.localStorage.getItem(LOCAL_STORAGE_KEYS.USERNAME) || '',
    };

    window.browserHistory = browserHistory;
  }

  componentDidMount() {
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
    const names = [
      'James Bond',
      'Luke Skywalker',
    ];
    return _.sample(names);
  }

  navigate() {
    browserHistory.push(`/join/${this.getRoomId()}/${this.state.name}`);
  }

  onSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    this.navigate();
  }

  render() {
    return (
      <div className="Auth App__content__view">
        <div >
          <form
            className="Auth__form"
            onSubmit={(e) => { this.onSubmit(e); }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                this.onSubmit(e);
              }
            }}
          >
            <label
              className="Auth__form__label"
              htmlFor="name"
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
              <button
                type="submit"
                className="Auth__form__btn Auth__form__btn--enter"
                disabled={!this.hasValidName()}
              >
                {'Enter'}
                <span className="icon-right-open icon-on-right" />
              </button>
            </span>
          </form>
        </div>
      </div>
    );
  }
}
