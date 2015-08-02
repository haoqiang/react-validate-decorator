'use strict';

import BaseRules from './base';

export default class NumberRules extends BaseRules {
  constructor(rules) {
    super(rules);

    this.rules = rules;
  }

  max(max) {
    this.rules.push(
      (string)=> new Promise((resolve, reject)=> {
        if (string.length <= max) {
          resolve(true);
        }
        reject('Input too big!');
      })
    );
    return this;
  }

  min(min) {
    this.rules.push(
      (string)=> new Promise((resolve, reject)=> {
        if (string.length >= min) {
          resolve(true);
        }
        reject('Input too small!');
      })
    );
    return this;
  }

  email() {
    this.rules.push(
      (string)=> new Promise((resolve, reject)=> {
        const re = /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i;
        if (re.test(string)) {
          resolve(true);
        }
        reject('Input not an email!');
      })
    );
    return this;
  }
}
