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
    browserHistory.push(`${this.state.code}/?`);
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
              for="code"
            >
              {'What\'s your code?'}
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
              <Link to={`/join/${this.state.code}`} className="Auth__form__btn Auth__form__btn--enter" disabled={!this.hasValidCode()}>
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
