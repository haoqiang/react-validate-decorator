'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _rulesIndexJs = require('../rules/index.js');

var _rulesIndexJs2 = _interopRequireDefault(_rulesIndexJs);

var _decoratorJsx = require('./decorator.jsx');

var _decoratorJsx2 = _interopRequireDefault(_decoratorJsx);

exports['default'] = function (rules, interceptor) {
  return function (BaseComponent) {
    return (function (_DecoratorComponent) {
      _inherits(_class, _DecoratorComponent);

      _createClass(_class, null, [{
        key: 'displayName',
        value: 'ValidateDecorator',
        enumerable: true
      }]);

      function _class(props, context) {
        _classCallCheck(this, _class);

        _get(Object.getPrototypeOf(_class.prototype), 'constructor', this).call(this, props, context);

        this.exposedMethods = ['validate'];
        this.state = {
          isValid: true,
          isValidating: false,
          validationState: null,
          validationMessage: ''
        };
      }

      _createClass(_class, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
          this.bindBaseFunction();
        }
      }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
          var _this = this;

          if (nextProps.value !== this.props.value) {
            this.setState({
              isValidating: true
            }, function () {
              return _this._validate(nextProps.value);
            });
          }
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          this.exposedMethods = ['validate'];
        }
      }, {
        key: '_setState',
        value: function _setState(validationState, validationMessage, callback) {
          this.setState({
            isValid: validationState !== 'error',
            isValidating: false,
            validationState: validationState,
            validationMessage: validationMessage
          }, callback);
        }
      }, {
        key: '_intercept',
        value: function _intercept(value) {
          if (typeof interceptor === 'function') {
            value = interceptor.call(null, value);
          }
          if (typeof this.props.interceptor === 'function') {
            value = this.props.interceptor.call(null, value);
          }
          return value;
        }
      }, {
        key: '_mergeRules',
        value: function _mergeRules() {
          var merged = undefined;
          if (this.props.required) {
            merged = (0, _rulesIndexJs2['default'])().required().done();
          } else {
            merged = (0, _rulesIndexJs2['default'])().allowEmpty().done();
          }
          if (Array.isArray(rules) && rules.length > 0) {
            merged = merged.concat(rules);
          }
          if (Array.isArray(this.props.rules) && this.props.rules.length > 0) {
            merged = merged.concat(this.props.rules);
          }
          return merged;
        }
      }, {
        key: '_validate',
        value: function _validate(value) {
          var _this2 = this;

          // allow interceptor to return raw value for validation
          value = this._intercept(value);
          var rules = this._mergeRules();

          return new Promise(function (resolve, reject) {
            return Promise.all(rules.map(function (d) {
              return d(value);
            })).then(function (results) {
              var message = results.reduce(function (m, d) {
                return d !== true ? m + ' ' + d : m;
              }, '');
              _this2._setState(message.length ? 'warning' : 'success', message, function () {
                resolve(true);
              });
            }, function (reason) {
              if (reason !== true) {
                _this2._setState('error', reason, function () {
                  resolve(false);
                });
              }
            });
          });
        }
      }, {
        key: 'validate',
        value: function validate() {
          return this._validate(this.props.value);
        }
      }, {
        key: 'getBaseComponent',
        value: function getBaseComponent(refs) {
          refs = refs || this.refs;
          return 'base' in refs ? this.getBaseComponent(refs.base) : refs;
        }
      }, {
        key: 'render',
        value: function render() {
          return _react2['default'].createElement(
            'div',
            { className: (0, _classnames2['default'])({
                'has-success': this.state.validationState === 'success',
                'has-warning': this.state.validationState === 'warning',
                'has-error': this.state.validationState === 'error'
              }) },
            _react2['default'].createElement(BaseComponent, _extends({ ref: 'base' }, this.props)),
            _react2['default'].createElement(
              'p',
              { className: 'help-block' },
              this.state.validationMessage
            )
          );
        }
      }]);

      return _class;
    })(_decoratorJsx2['default']);
  };
};

module.exports = exports['default'];