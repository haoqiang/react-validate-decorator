'use strict';

import _ from 'lodash';
import React from 'react';
import classnames from 'classnames';

import {validate, rules} from '../src';

import Input from './inputs/input-text.jsx';

let InputAge = validate(rules().number().min(5).max(100).done(), (v)=> {
  let number = parseInt(v);
  return _.isNumber(number) && !_.isNaN(number) ? number : null;
})(Input);

let InputEmail = validate(rules().string().email().done())(Input);

let InputUsername = validate(rules().string().min(3).max(10).done())(Input);

let InputText = validate(rules().done())(Input);


class Main extends React.Component {
  constructor(props, ctx) {
    super(props);
    this.state = {
      isInitializing: true,
      validationResult: 'unknown',
      fields: {
        email: {
          label: 'Email',
          rule: 'required, email',
          value: null
        },
        age: {
          label: 'Age',
          rule: 'required, number, 5~100',
          value: null
        },
        username: {
          label: 'Username',
          rule: 'required, length between 3~10',
          value: null
        },
        verifyUsername: {
          label: 'Verify Username',
          rule: 'required, same as username',
          value: null
        },
        hobby: {
          label: 'Hobby',
          rule: 'required',
          value: {
            cont: null
          }
        }
      }
    };
  }

  componentDidMount() {
  }

  validateAllInputs() {
    Promise
      .all(['email', 'age', 'username', 'verifyUsername', 'hobby'].map((d)=> {
        return this.refs[d].validate();
      }))
      .then((results)=> {
        let result = results.reduce((m, d)=> {
          return m && d;
        }, true);
        this.setState({
          validationResult: result
        });
      });
  }

  updateFields(fieldId, value) {
    let fields = _.clone(this.state.fields);
    fields[fieldId].value = value;
    this.setState({
      fields: fields
    });
  }

  render() {
    return (
      <div className="container">
        <h2>React Validate Decorator</h2>
        <p>React-Validate-Decorator is a validation plugin for es6 react projects.
           The idea is inspired by Higher Order Components.</p>
        <hr/>
        <div className="col-md-6">
          <p>Input state: </p>
          <pre><code className="json">{JSON.stringify(this.state.fields, null, 2)}</code></pre>
        </div>
        <div className="form col-md-6">
          <p>Validation results: <var>{this.state.validationResult.toString()}</var></p>
          <div className="row">
            <div className="">
              <InputEmail
                id="email"
                ref="email"
                required
                value={this.state.fields.email.value}
                label={this.state.fields.email.label}
                onChange={this.updateFields.bind(this, 'email')}/>
            </div>
          </div>
          <div className="row">
            <div className="">
              <InputAge
                id="age"
                ref="age"
                required
                value={this.state.fields.age.value}
                label={this.state.fields.age.label}
                onChange={this.updateFields.bind(this, 'age')}/>
            </div>
          </div>
          <div className="row">
            <div className="">
              <InputUsername
                id="username"
                ref="username"
                required
                value={this.state.fields.username.value}
                label={this.state.fields.username.label}
                onChange={this.updateFields.bind(this, 'username')}/>
            </div>
          </div>
          <div className="row">
            <div className="">
              <InputUsername
                id="verifyUsername"
                ref="verifyUsername"
                required
                value={this.state.fields.verifyUsername.value}
                label={this.state.fields.verifyUsername.label}
                rules={rules().eq(this.state.fields.username.value).done()}
                onChange={this.updateFields.bind(this, 'verifyUsername')}/>
            </div>
          </div>
          <div className="row">
            <div className="">
              <InputText
                id="hobby"
                ref="hobby"
                required
                value={this.state.fields.hobby.value}
                label={this.state.fields.hobby.label}
                valueType="cont"
                interceptor={(v)=> { return v ? v.cont : null; }}
                onChange={this.updateFields.bind(this, 'hobby')}/>
            </div>
          </div>
          <div className="row">
            <div className="">
              <button className="btn btn-primary" onClick={this.validateAllInputs.bind(this)}>Submit form</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

React.render(<Main />, document.getElementById('app'));
