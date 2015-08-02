var webpack = require('webpack');
var path = require('path');

module.exports = {
  devServer: {
    host: 'localhost',
    port: '7000',
    contentBase: './examples',
    hot: true,
    quiet: false,
    noInfo: false,
    lazy: false,
    inline: false,
    watchDelay: 500,
    historyApiFallback: true,
    stats: {
      colors: true
    }
  },
  entry: {
    app: [
      './examples/index.js'
    ],
    vendor: [
      'react'
    ]
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/'
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.min.js'),
    new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}})
  ],

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader?stage=0&optional=runtime'
      },

      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'eslint-loader'
      },

      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: 'style-loader!css-loader!sass-loader!compass-loader'
      },

      {
        test: /\.(png|jpg|jpeg|bmp|ico|gif)$/,
        loader: 'url-loader'
      }
    ]
  }
};
