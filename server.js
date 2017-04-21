const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config');
const path = require('path');
const express = require('express');
const parser = require('body-parser');
const route = require('./server/routes');

const app = express();

if (process.env.NODE_ENV !== 'production') {
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }));
  app.use(webpackHotMiddleware(compiler));
}
app.use(express.static(path.join(__dirname, 'client/dist')));
app.get('/app/*', (req, res) => {
  res.sendFile(`${__dirname}/client/dist/index.html`);
});

const port = process.env.PORT || 4000;

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

app.use('/', route.userRouter);
app.use('/', route.searchRouter);
app.use('/', route.documentRouter);

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});

module.exports = app;
