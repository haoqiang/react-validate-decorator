'use strict';

import React from 'react';
import classnames from 'classnames';

import validationRules from '../rules/index.js';
import DecoratorComponent from './decorator.jsx';

export default (rules, interceptor) => BaseComponent =>
  class extends DecoratorComponent {
    static displayName = 'ValidateDecorator';
    exposedMethods = ['validate'];

    constructor(props, context) {
      super(props, context);

      this.state = {
        isValid: true,
        isValidating: false,
        validationState: null,
        validationMessage: ''
      };
    }

    componentDidMount() {
      this.bindBaseFunction();
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.value !== this.props.value) {
        this.setState({
          isValidating: true
        }, ()=> this._validate(nextProps.value));
      }
    }

    componentWillUnmount() {
      this.exposedMethods = ['validate'];
    }

    _setState(validationState, validationMessage, callback) {
      this.setState({
        isValid: validationState !== 'error',
        isValidating: false,
        validationState: validationState,
        validationMessage: validationMessage
      }, callback);
    }

    _intercept(value) {
      if (typeof interceptor === 'function') {
        value = interceptor.call(null, value);
      }
      if (typeof this.props.interceptor === 'function') {
        value = this.props.interceptor.call(null, value);
      }
      return value;
    }

    _mergeRules() {
      let merged;
      if (this.props.required) {
        merged = validationRules().required().done();
      } else {
        merged = validationRules().allowEmpty().done();
      }
      if (Array.isArray(rules) && rules.length > 0) {
        merged = merged.concat(rules);
      }
      if (Array.isArray(this.props.rules) && this.props.rules.length > 0) {
        merged = merged.concat(this.props.rules);
      }
      return merged;
    }

    _validate(value) {
      // allow interceptor to return raw value for validation
      value = this._intercept(value);
      let rules = this._mergeRules();

      return new Promise((resolve, reject)=>
          Promise
            .all(rules.map((d)=> {
              return d(value);
            }))
            .then((results)=> {
              let message = results.reduce((m, d)=> {
                return (d !== true) ? m + ' ' + d : m;
              }, '');
              this._setState((message.length) ? 'warning' : 'success', message, ()=> {
                resolve(true);
              });
            }, (reason)=> {
              if (reason !== true) {
                this._setState('error', reason, ()=> {
                  resolve(false);
                });
              }
            })
      );
    }

    validate() {
      return this._validate(this.props.value);
    }

    getBaseComponent(refs) {
      refs = refs || this.refs;
      return ('base' in refs) ? this.getBaseComponent(refs.base) : refs;
    }

    render() {
      return (
        <div className={classnames({
        'has-success': (this.state.validationState === 'success'),
        'has-warning': (this.state.validationState === 'warning'),
        'has-error': (this.state.validationState === 'error')
        })}>
          <BaseComponent ref="base" {...this.props}/>
          <p className='help-block'>
            {this.state.validationMessage}
          </p>
        </div>
      );
    }
  };
