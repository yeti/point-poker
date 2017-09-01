
const express = require('express');
const secure = require('express-force-https');

const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');

const compiler = webpack(webpackConfig);

const app = express();

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
}));
app.use(require('webpack-hot-middleware')(compiler));

const http = require('http').Server(app);
const io = require('socket.io')(http);
const socket = require('./lib/socket');

socket.init(io);

const port = process.env.PORT || 4200;

app.use(express.static(__dirname + '/public'));
app.use(secure);

const sendPage = (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
};

// Because we are wildcarding the home page, the manifest has to be specified. There's gotta be a better way :/
app.get('/manifest.json', (req, res) => {
  res.sendFile(__dirname + '/manifest.json');
});

app.get('/serviceWorker.js', (req, res) => {
  res.sendFile(__dirname + '/serviceWorker.js');
});

app.get('/style.css', (req, res) => {
  res.sendFile(__dirname + 'style.css');
});

app.get('/bundle.js', (req, res) => {
  res.sendFile(__dirname + '/bundle.js');
});

app.get('/*', sendPage);
/*
app.get('/:room/', sendPage);
app.get('/:room/:user', sendPage);
*/

http.listen(port, function () {
  console.log('listening on *:' + port);
});
