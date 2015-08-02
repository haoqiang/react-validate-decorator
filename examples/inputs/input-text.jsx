'use strict';

import _ from 'lodash';
import React from 'react';
import classnames from 'classnames';

import InputComponent from './input.jsx';

class InputText extends InputComponent {
  exposedMethods = [
    'getValue',
    'getChangedValue',
    'getSpecifiedValue'
  ];

  constructor(props, ctx) {
    super(props);
    this.state = {
      isChanged: false,
      value: props.value !== undefined ? props.value : '',
      prevValue: props.value !== undefined ? props.value : ''
    };
  }

  _getValue() {
    if (typeof this.state.value === 'string') {
      return this.state.value.trim();
    } else {
      return this.state.value;
    }
  }

  onInputChange(e) {
    if (!this.props.readOnly) {
      var formattedValue = {};
      if (this.props.valueType) {
        formattedValue[this.props.valueType] = e.target.value;
      } else {
        formattedValue = e.target.value;
      }
      this.setState({
        value: formattedValue
      }, ()=> {
        this.props.onChange(this.state.value);
      });
    }
  }

  render() {
    var rawValue = (this.props.valueType) ? this.state.value[this.props.valueType] : this.state.value;

    return (
      <div className={classnames('form-group')}>
        {this.props.label ?
          <label
            htmlFor={'text-' + this.props.id}
            className={classnames('control-label', {required: this.props.required})}>
            {this.props.label}
          </label>
          : null}
        <input
          id={'text-' + this.props.id}
          ref='input'
          type='text'
          name={this.props.id}
          label={this.props.label}
          value={rawValue}
          readonly={this.props.readonly}
          placeholder={this.props.placeholder}
          onChange={this.onInputChange.bind(this)}
          className="form-control"/>
      </div>
    );
  }
}

export default InputText;
