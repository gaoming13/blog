const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const pathRoot = path.resolve(__dirname, './');

module.exports = {
  target: 'web',
  mode: 'production',
  entry: {
    app: pathRoot + '/src/index.js',
  },
  output: {
    path: pathRoot + '/dist',
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      }
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
};