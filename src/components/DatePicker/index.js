import React, { Component, PropTypes as T } from 'react';
import { DateField } from 'react-date-picker';
import classnames from 'classnames';

import 'react-date-picker/index.css'
import './DatePicker.css';

export default class DatePicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPristine: true,
      isFocused: false,
    }
  }

  /*** Methods ***/

  onFocus(name, value) {
    this.setState({
      isFocused: true,      // Set Focused
    })
  }

  onBlur(name, value) {
    if (this.props.noValidation) {
      this.props.onBlur(name, value); // Call onBlur props function
    } else {
      this.setState({
        isPristine: false,  // Set Dirty
        isFocused: false,   // Set Blur
      })
    }
  }

  /*** Render ***/

  render() {
    const {
      dateFormat,
      minDate,
      className,
      type,
      display,
      name,
      label,
      placeholder,
      value,
      validate,
      message,
      required,
      onChange,
      disabled
    } = this.props;
    const {
      isPristine,
      isFocused,
    } = this.state

    const DatePickerClass = classnames(
      className,
      'DatePicker',
    )
    const labelClass = classnames(
      'DatePicker-label'
    )
    const inputClass = classnames(
      'DatePicker-input',
      `DatePicker-input-${display}`,
      {
        'DatePicker-input-is-error': !isPristine && !isFocused &&
        (value ? !validate(value) : required)
      }
    )

    return (
      <div className={DatePickerClass}>
        {label &&
          <label className={labelClass} htmlFor={name}>
            {label}
            {!required &&
              <span className="DatePicker-label-span"> - Opsional</span>
            }
          </label>
        }
        <DateField
          updateOnDateClick
          collapseOnDateClick
          minDate={minDate}
          dateFormat={dateFormat}
          className={inputClass}
          id={name}
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onFocus={(e) => this.onFocus(name, e.target.value)}
          onChange={(e) => onChange(name, e)}
          onBlur={(e) => this.onBlur(name, e.target.value)}
          required={required}
          disabled={disabled}
          />
        {!isPristine && !isFocused &&
          (value ?
            (!validate(value) && /* Validation Message */
              <span className="DatePicker-message">{`* ${message}`}</span>)
            :
            (required && /* Requiring Message */
              <span className="DatePicker-message">{`* ${label} harus diisi`}</span>)
          )
        }
      </div>
    )
  }
}

DatePicker.defaultProps = {
  dateFormat: 'DD-MM-YYYY',
  display: 'fullwidth',
  validate: () => true,
  message: '',
  disabled: false
}

DatePicker.propTypes = {
  dateFormat: T.string,             // Date Format
  minDate: T.any,                   // Minimum Date Selectable
  name: T.string,                   // Name
  label: T.string,                  // Label
  placeholder: T.string,            // Placeholder
  value: T.any,                     // Value
  onChange: T.func.isRequired,      // onChange Function
  onBlur: T.func,                   // onBlur Function
  noValidation: T.bool,             // Flag to disable Validation
  validate: T.func,                 // Validation Function
  message: T.string,                // Error Message
  required: T.bool,                 // is Required
  disabled: T.bool,                 // is Disabled
}
