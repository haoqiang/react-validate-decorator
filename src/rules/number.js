'use strict';

import BaseRules from './base';

export default class NumberRules extends BaseRules {
  constructor(rules) {
    super(rules);

    this.rules = rules;
  }

  max(max) {
    this.rules.push(
      (number)=> new Promise((resolve, reject)=> {
        if (number <= max) {
          resolve(true);
        }
        reject('Input too big!');
      })
    );
    return this;
  }

  min(min) {
    this.rules.push(
      (number)=> new Promise((resolve, reject)=> {
        if (number >= min) {
          resolve(true);
        }
        reject('Input too small!');
      })
    );
    return this;
  }

  inRange(min, max) {
    this.rules.push(
      (number)=> new Promise((resolve, reject)=> {
        if (number <= max && number >= min) {
          resolve(true);
        }
        reject('Input not in range!');
      })
    );
    return this;
  }
}
