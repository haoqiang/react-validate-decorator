'use strict';

export default class BaseRules {
  constructor(rules) {
    this.rules = rules;
  }

  append(func) {
    this.rules.push(func);
    return this;
  }

  eq(equalTo) {
    this.rules.push(
      (value)=> new Promise((resolve, reject)=> {
        if (value === equalTo) {
          resolve(true);
        }
        reject('Input not equal.');
      })
    );
    return this;
  }

  size() {
    return this.rules.length;
  }

  done() {
    return this.rules;
  }
}
