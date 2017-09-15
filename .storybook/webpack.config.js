const path = require('path');

const webpackConfig = require('../webpack.config.js');

module.exports = (config) => {

  config.module.rules = [
    ...config.module.rules,
    ...webpackConfig.module.rules,
  ];
  config.context = path.resolve(__dirname, '../src');
  config.resolve.modules.push(path.resolve(__dirname, '../src'));

  return config;
};
