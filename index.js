require('dotenv').config();
const express = require('express');
const secure = require('express-force-https');
const expressStaticGzip = require("express-static-gzip");

const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');

const isProduction = process.env.NODE_ENV === 'production';
const app = express();

console.log(`${isProduction ? 'Production' : 'Dev'} Build!`);

// If in dev, hook up webpack dev middleware for hmr
if (!isProduction) {
  const compiler = webpack(webpackConfig);
  app.use(require('webpack-hot-middleware')(compiler));
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
  }));
}

const http = require('http').Server(app);
const io = require('socket.io')(http);
const socket = require('./lib/socket');

socket.init(io);

const port = process.env.PORT || 4200;

// Try to send down gzipped static assets if available
app.use('/', expressStaticGzip(__dirname + '/public', {}));

// Try to redirect to https
app.use(secure);

// Reroute unmatched routes to home page
app.use((req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Start server
http.listen(port, function () {
  console.log('listening on *:' + port);
});
