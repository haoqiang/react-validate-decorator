'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _baseJs = require('./base.js');

var _baseJs2 = _interopRequireDefault(_baseJs);

var _numberJs = require('./number.js');

var _numberJs2 = _interopRequireDefault(_numberJs);

var _stringJs = require('./string.js');

var _stringJs2 = _interopRequireDefault(_stringJs);

var Rules = (function (_BaseRules) {
  _inherits(Rules, _BaseRules);

  function Rules(rules) {
    _classCallCheck(this, Rules);

    _get(Object.getPrototypeOf(Rules.prototype), 'constructor', this).call(this, rules);

    this.rules = rules;
  }

  _createClass(Rules, [{
    key: 'required',
    value: function required() {
      this.rules.push(function (value) {
        return new Promise(function (resolve, reject) {
          if (value !== null && value !== undefined && value !== '') {
            resolve(true);
          }
          reject('Input cannot be empty!');
        });
      });
      return this;
    }
  }, {
    key: 'allowEmpty',
    value: function allowEmpty() {
      this.rules.push(function (value) {
        return new Promise(function (resolve, reject) {
          if (value === null || value === undefined || value === '') {
            reject(true);
          }
          resolve(true);
        });
      });
      return this;
    }
  }, {
    key: 'number',
    value: function number() {
      this.rules.push(function (number) {
        return new Promise(function (resolve, reject) {
          if (toString.call(number) === '[object Number]' && number === +number) {
            resolve(true);
          }
          reject('Input needs to be number!');
        });
      });
      return new _numberJs2['default'](this.rules);
    }
  }, {
    key: 'string',
    value: function string() {
      this.rules.push(function (string) {
        return new Promise(function (resolve, reject) {
          if (toString.call(string) === '[object String]') {
            resolve(true);
          }
          reject('Input needs to be string!');
        });
      });
      return new _stringJs2['default'](this.rules);
    }
  }]);

  return Rules;
})(_baseJs2['default']);

exports['default'] = function () {
  return new Rules([]);
};

module.exports = exports['default'];