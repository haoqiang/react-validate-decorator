'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _decoratorValidateJs = require('./decorator/validate.js');

var _decoratorValidateJs2 = _interopRequireDefault(_decoratorValidateJs);

var _rulesIndexJs = require('./rules/index.js');

var _rulesIndexJs2 = _interopRequireDefault(_rulesIndexJs);

exports['default'] = {
  validate: _decoratorValidateJs2['default'],
  rules: _rulesIndexJs2['default']
};
module.exports = exports['default'];