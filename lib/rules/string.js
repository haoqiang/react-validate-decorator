'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var NumberRules = (function (_BaseRules) {
  _inherits(NumberRules, _BaseRules);

  function NumberRules(rules) {
    _classCallCheck(this, NumberRules);

    _get(Object.getPrototypeOf(NumberRules.prototype), 'constructor', this).call(this, rules);

    this.rules = rules;
  }

  _createClass(NumberRules, [{
    key: 'max',
    value: function max(_max) {
      this.rules.push(function (string) {
        return new Promise(function (resolve, reject) {
          if (string.length <= _max) {
            resolve(true);
          }
          reject('Input too big!');
        });
      });
      return this;
    }
  }, {
    key: 'min',
    value: function min(_min) {
      this.rules.push(function (string) {
        return new Promise(function (resolve, reject) {
          if (string.length >= _min) {
            resolve(true);
          }
          reject('Input too small!');
        });
      });
      return this;
    }
  }, {
    key: 'email',
    value: function email() {
      this.rules.push(function (string) {
        return new Promise(function (resolve, reject) {
          var re = /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i;
          if (re.test(string)) {
            resolve(true);
          }
          reject('Input not an email!');
        });
      });
      return this;
    }
  }]);

  return NumberRules;
})(_base2['default']);

exports['default'] = NumberRules;
module.exports = exports['default'];