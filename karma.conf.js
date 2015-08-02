var webpack = require('webpack');
var webpackConfig = require('./webpack.test.config');

module.exports = function (config) {
  config.set({
    browsers: [process.env.CONTINUOUS_INTEGRATION ? 'Firefox' : 'Chrome'],
    singleRun: true,
    frameworks: ['mocha'],
    files: [
      'tests.webpack.js'
    ],
    preprocessors: {
      'tests.webpack.js': ['webpack', 'sourcemap']
    },
    reporters: [process.env.CONTINUOUS_INTEGRATION ? 'dots' : 'nyan'],
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true
    }
  });
};
