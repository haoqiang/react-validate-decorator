'use strict';

import validate from './decorator/validate.js';
import validationRules from './rules/index.js';

export default {
  validate: validate,
  rules: validationRules
};

