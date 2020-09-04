const path = require('path');
const webpack = require('webpack');

const pathRoot = path.resolve(__dirname, './');

module.exports = {
  target: 'web',
  mode: 'development',
  entry: {
    index: pathRoot + '/src/index.js',
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
  devServer: {
    port: 8888,
    host: '0.0.0.0',
    useLocalIp: true,
    open: true,
    hot: true,
    historyApiFallback: true,
    disableHostCheck: true,
    contentBase: pathRoot + '/dist',
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};
