import React from 'react';
import JoinLink from '../joinLink';
import {LOCAL_STORAGE_KEYS} from '../../utils/constants';
import { browserHistory, Link } from 'react-router';

export default class Join extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      code: '',
    };

    window.browserHistory = browserHistory;
  }

  componentDidMount(){
    this.codeInput.focus();
  }

  handleCodeChange(event) {
    this.setState({
      code: event.target.value && event.target.value.toUpperCase(),
    });
  }

  getRoomId() {
    return this.props.params.room;
  }

  hasValidCode() {
    return this.state.code !== '';
  }

  get placeholderCode() {
    return 'ABCD';
  }

  navigate() {
    browserHistory.push(`/join/${this.state.code}/?`);
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
              for="code"
            >
              {'Which session?'}
            </label>
            <input
              className="Auth__form__input"
              id="code"
              type="text"
              placeholder={this.placeholderCode}
              value={this.state.code}
              onChange={(e) => { this.handleCodeChange(e); }}
              ref={(input) => { this.codeInput = input; }}
              maxLength="10"
              autoComplete="off"
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
                disabled={!this.hasValidCode()}
              >
                {'Join'}
                <span className="icon-right-open icon-on-right" />
              </button>
            </span>
          </form>
        </div>
      </div>
    );
  }
}
