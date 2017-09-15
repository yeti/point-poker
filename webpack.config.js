const { resolve } = require('path');

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const config = {
  devtool: 'inline-source-map',

  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    './index.js',
    './styles/main.scss',
  ],

  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'public'),
    publicPath: '/',
  },

  context: resolve(__dirname, 'src'),

  devServer: {
    hot: true,
    contentBase: resolve(__dirname, 'build'),
    publicPath: '/',
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.js$/,
        loaders: [
          'babel-loader',
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                includePaths: [
                  resolve(__dirname, 'src/styles'),
                ],
                sourceMap: false,
              },
            },
          ],
        }),
      },
      { test: /\.(png|jpg)$/, use: 'url-loader?limit=15000' },
      { test: /\.eot(\?v=\d+.\d+.\d+)?$/, use: 'file-loader' },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/, use: 'url-loader?limit=10000&mimetype=application/octet-stream' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader?limit=10000&mimetype=image/svg+xml' },
    ],
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      test: /\.js$/,
      options: {
        eslint: {
          configFile: resolve(__dirname, '.eslintrc'),
          cache: false,
        },
      },
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new ExtractTextPlugin({ filename: 'style.css', disable: false, allChunks: true }),
    new CopyWebpackPlugin([{ from: 'build', to: '' }]),
    new OpenBrowserPlugin({ url: `http://localhost:${process.env.PORT || 4200}` }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
};

module.exports = config;
