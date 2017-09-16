import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classwrap from 'classwrap';

import Button from 'components/Button';
import './_Form.scss';

class Form extends Component {

  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  componentDidMount() {
    this.input.focus();
  }

  handleKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.props.onSubmit(e);
    }
  }

  handleChange(event) {
    this.setState({
      value: event.target.value && event.target.value.toUpperCase(),
    });
  }

  inputIsValid() {
    return this.state.value !== '';
  }


  handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    this.props.onSubmit(this.state.value);
  }

  render() {
    const {
      className,
      label,
      onBack,
      backLabel,
      submitLabel,
      placeholder,
    } = this.props;

    const classNames = classwrap([
      'Form',
      className,
    ]);

    return (
      <div className={classNames}>
        <form
          className="Form__form"
          onSubmit={ e => this.handleSubmit(e) }
          onKeyDown={ e => this.handleKeyDown(e) }
        >
          <label
            className="Form__label"
            htmlFor="code"
          >
            {label}
          </label>
          <input
            className="Form__input"
            id="code"
            type="text"
            placeholder={placeholder}
            value={this.state.value}
            onChange={(e) => { this.handleChange(e); }}
            ref={(input) => { this.input = input; }}
            maxLength="10"
            autoComplete="off"
          />
          <span className="Form__actions">
            <Button
              className="Form__btn Form__btn--back"
              onClick={onBack}
            >
              <span className="icon-left-open icon-on-left" />
              {backLabel}
            </Button>
            <Button
              type="submit"
              className="Form__btn Form__btn--submit"
              disabled={!this.inputIsValid()}
              buttonType="primary"
            >
              {submitLabel}
              <span className="icon-right-open icon-on-right" />
            </Button>
          </span>
        </form>
      </div>
    );
  }
}

Form.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  onSubmit: PropTypes.func,
  onBack: PropTypes.func,
  backLabel: PropTypes.string,
  submitLabel: PropTypes.string,
  placeholder: PropTypes.string,
};

export default Form;
