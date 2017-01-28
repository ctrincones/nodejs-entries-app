import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../webpack.config.dev';
import webpackHotMiddleware from 'webpack-hot-middleware';
import BodyParser from 'body-parser';
import mongoose from './db/mongoose';
import User from './models/user';

let app = express();
const compiler = webpack(webpackConfig);

app.use(webpackMiddleware(compiler,{
  hot: true,
  publicPath: webpackConfig.output.publicPath,
  noInfo: true
}));
app.use(webpackHotMiddleware(compiler));

app.get('*/',(req,res) => {
  res.sendFile(path.join(__dirname,'../public/index.html'));
});

app.use(BodyParser.json());

app.post('/api/users', (req, res) => {
  const requestBody = req.body;
  const newUser = new User(requestBody);
  newUser.save().then(() => {
    res.send("User successfuly created");
  }).catch(() => {
    res.send("An error ocurred");
  });
});

app.listen(3000,() => console.log("Hello world"));
