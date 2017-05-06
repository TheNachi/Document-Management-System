const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config');
const path = require('path');
const express = require('express');
const parser = require('body-parser');
const route = require('./server/routes');
const swaggerSpec = require('./server/routes/swagger');

require('dotenv').config();

const app = express();

if (process.env.NODE_ENV !== 'test') {
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }));
  app.use(webpackHotMiddleware(compiler));
}

app.use(express.static(path.join(__dirname, 'client/')));
app.get('/app/*', (req, res) => {
  res.sendFile(`${__dirname}/client/index.html`);
});

const port = process.env.PORT || 4000;

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS');
  res.send(swaggerSpec);
});

app.use('/', route.userRouter);
app.use('/', route.roleRouter);
app.use('/', route.documentRouter);
app.get('/doc', (req, res) => {
  res.status(200)
  .sendFile(path.join(__dirname, 'server/Swagger', 'index.html'));
});

app.use(express.static(path.join(__dirname, 'server/Swagger')));

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});

module.exports = app;
