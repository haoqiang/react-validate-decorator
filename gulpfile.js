var gulp = require('gulp');
var path = require('path');
var $ = require('gulp-load-plugins')();
var del = require('del');
var runSequence = require('run-sequence');

// Webpack
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var webpackExamplesConfig = require('./webpack.examples.config');

var distPath = path.join(__dirname, 'dist');
var examplesPath = path.join(__dirname, 'examples');

gulp.task('clean', function(callback) {
  del([ distPath ], { force: true }, callback);
});

gulp.task('build:examples', function(callback) {
  webpack(webpackExamplesConfig).run(function(err, stats) {
    if (err) return console.log(err);
    callback();
  });
});

gulp.task('serve', function(callback) {
  var devConfig = Object.create(webpackExamplesConfig);
  devConfig.devtool = 'eval';
  devConfig.debug = true;

  var webpackDevServer = new WebpackDevServer(webpack(devConfig), devConfig.devServer);

  if (webpackDevServer) {
    webpackDevServer
      .listen(devConfig.devServer.port, devConfig.devServer.host, function(err) {
        if (err) return console.log(err);
        runSequence('open');
        callback();
      });
  } else {
    callback();
  }
});

gulp.task('open', function() {
  var options = {
    url: 'http://' + webpackExamplesConfig.devServer.host + ':' + webpackExamplesConfig.devServer.port,
    app: 'google chrome'
  };

  return gulp.src(examplesPath + '/index.html')
    .pipe($.open('', options));
});

gulp.task('default', function() {
  runSequence('serve');
});

gulp.task('build', function() {
  runSequence('clean', 'build:examples');
});
