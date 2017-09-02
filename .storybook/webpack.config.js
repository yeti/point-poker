const path = require('path');

const webpackConfig = require('../webpack.config.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (config) => {

  config.module.rules = [
    ...config.module.rules,
    ...webpackConfig.module.rules,
  ];
  config.context = path.resolve(__dirname, '../src');
  config.resolve.modules.push(path.resolve(__dirname, '../src'));

  config.plugins.push(new ExtractTextPlugin({ filename: 'style.css', disable: false, allChunks: true }));

  return config;
};
