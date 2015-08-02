var path = require('path');

module.exports = {
  resolve: {
    root: [
      path.join(__dirname, 'src/js'),
      path.join(__dirname, 'src')
    ]
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      },

      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: 'null-loader'
      },

      {
        test: /\.(png|jpg|jpeg|bmp|ico)$/,
        loader: 'url-loader'
      },

      {
        test: /\.(svg)$/,
        loader: 'raw-loader'
      }
    ]
  }
};
