import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classwrap from 'classwrap';

import Button from 'components/Button';
import BackButton from 'components/BackButton';
import './_Form.scss';

class Form extends Component {

  constructor(props) {
    super(props);
    this.state = { value: props.value };
  }

  componentDidMount() {
    this.input.focus();
  }

  handleKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.handleSubmit(e);
    }
  }

  handleChange(event) {
    this.setState({
      value: this.props.valueTransform(event.target.value),
    });
  }

  inputIsValid() {
    return this.state.value !== '';
  }


  handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.inputIsValid()) {
      this.props.onSubmit(this.state.value);
    }
  }

  moveCaretAtEnd(e) {
    const tempValue = e.target.value;
    e.target.value = '';
    e.target.value = tempValue;
  }

  render() {
    const {
      className,
      label,
      submitLabel,
      placeholder,
    } = this.props;

    const classNames = classwrap([
      'Form',
      {
        Form: {
          '--isValid': this.inputIsValid(),
        },
      },
      className,
    ]);

    return (
      <div className={classNames}>
        <form
          className="Form__Form"
          onSubmit={ e => this.handleSubmit(e) }
          onKeyDown={ e => this.handleKeyDown(e) }
        >
          <BackButton className="Form__BackButton" />
          <label
            className="Form__Label"
            htmlFor="code"
          >
            {label}
          </label>
          <div className="Form__InputGroup">
            <input
              className="Form__Input"
              id="code"
              type="text"
              placeholder={placeholder}
              value={this.state.value}
              onChange={(e) => { this.handleChange(e); }}
              ref={(input) => { this.input = input; }}
              maxLength="10"
              autoComplete="off"
              onFocus={this.moveCaretAtEnd}
            />
            <Button
              type="submit"
              className="Form__SubmitButton"
              buttonType="primary"
            >
              {submitLabel}
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

Form.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  onSubmit: PropTypes.func,
  submitLabel: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  valueTransform: PropTypes.func,
};

Form.defaultProps = {
  value: '',
  valueTransform: (value => value),
};

export default Form;
