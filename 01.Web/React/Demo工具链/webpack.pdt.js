const path = require('path');
const webpack = require('webpack');

const pathRoot = path.resolve(__dirname, './');

module.exports = {
  target: 'web',
  mode: 'production',
  entry: {
    index: pathRoot + '/src/index.jsx',
  },
  output: {
    path: pathRoot + '/dist',
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env'] }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      }
    ],
  },
  resolve: { extensions: ['*', '.js', '.jsx'] },
};