import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import BodyParser from 'body-parser';
import moment from 'moment';
import _ from 'lodash';

import webpackConfig from '../webpack.config.dev';
import webpackHotMiddleware from 'webpack-hot-middleware';
import mongoose from './db/mongoose';
import User from './models/user';
import getUserTimeline from './twitter/timeline';
import authenticate from './middleware/authenticate';
import Entry from './models/entries';
import RegisterUser from './routes/users/register';
import LoginUser from './routes/users/login';
import getUserData from './routes/users/getData';
import LogoutUser from './routes/users/logout';
import CreateEntry from './routes/entries/create';
import GetMainPageEntries from './routes/entries/getMainPage';
import EditEntry from './routes/entries/edit';
import fetchUserEntries from './routes/entries/fetchUserEntries';
import fetchUserTweets from './routes/entries/fetchUserTweets';
import hideUserTweets from './routes/entries/hideUserTweets';
import showUserTweet from './routes/entries/showUserTweet';

//Express and webpack configs

let app = express();
const compiler = webpack(webpackConfig);

app.use(webpackMiddleware(compiler,{
  hot: true,
  publicPath: webpackConfig.output.publicPath,
  noInfo: true
}));
app.use(webpackHotMiddleware(compiler));

app.use(BodyParser.json());

//Api routes

//Register a new user
app.post('/api/users/register', RegisterUser );

//Log in a user
app.post('/api/users/login', LoginUser );

//get user data if its loggedin

app.get('/api/user/get', authenticate, getUserData);

//Log out user
app.delete('/api/users/delete/token', authenticate, LogoutUser);

//Add a new entry
app.post('/api/entries/add/', authenticate , CreateEntry);

//Get last three entries per user ordered by creation date
app.get('/api/entries/', GetMainPageEntries);

//Edit an entry
app.patch('/api/entries/edit/:id', authenticate, EditEntry );

//Fetch user entries
app.get('/api/entries/user/:id', fetchUserEntries);

//Fecth user tweets and hide hidden ones if user isnt the author
app.get('/api/entries/user/tweets/:id', fetchUserTweets );
//hide tweets from user
app.post('/api/entries/tweets/hide/:id', authenticate, hideUserTweets );
//show user hidden tweet
app.post('/api/entries/tweets/show/:id', authenticate, showUserTweet );
//Send public/index.htl to client
app.get('*/',(req,res) => {
  res.sendFile(path.join(__dirname,'../public/index.html'));
});

//Listen for connections on port 3000
app.listen(3000,() => console.log("Server running on port 3000"));
