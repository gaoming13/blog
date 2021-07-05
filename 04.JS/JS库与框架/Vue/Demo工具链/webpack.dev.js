const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const pathRoot = path.resolve(__dirname, './');

module.exports = {
  target: 'web',
  mode: 'development',
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
      // {
      //   test: /\.js$/,
      //   exclude: /(node_modules)/,
      //   loader: 'babel-loader',
      //   options: { presets: ['@babel/env'] }
      // },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      }
    ],
  },
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
  plugins: [
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // 生成html
    new HtmlWebpackPlugin({
      filename: 'index.html',
      // template: pathSrc + '/app.html',
      cache: true,
      hash: false,
      chunks: ['app'],
    }),
  ],
};
