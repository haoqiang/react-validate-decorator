'use strict';

import BaseRules from './base';
import NumberRules from './number';
import StringRules from './string';

class Rules extends BaseRules {
  constructor(rules) {
    super(rules);

    this.rules = rules;
  }

  required() {
    this.rules.push(
      (value)=> new Promise((resolve, reject)=> {
        if (value !== null && value !== undefined && value !== '') {
          resolve(true);
        }
        reject('Input cannot be empty!');
      })
    );
    return this;
  }

  allowEmpty() {
    this.rules.push(
      (value)=> new Promise((resolve, reject)=> {
        if (value === null || value === undefined || value === '') {
          reject(true);
        }
        resolve(true);
      })
    );
    return this;
  }

  number() {
    this.rules.push(
      (number)=> new Promise((resolve, reject)=> {
        if (toString.call(number) === '[object Number]' && number === +number) {
          resolve(true);
        }
        reject('Input needs to be number!');
      })
    );
    return new NumberRules(this.rules);
  }

  string() {
    this.rules.push(
      (string)=> new Promise((resolve, reject)=> {
        if (toString.call(string) === '[object String]') {
          resolve(true);
        }
        reject('Input needs to be string!');
      })
    );
    return new StringRules(this.rules);
  }
}

export default ()=> {
  return new Rules([]);
};
