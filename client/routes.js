import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';

import MainPage from './components/main/MainPage';
import SigninPage from './components/signin/SigninPage';
import RegisterPage from './components/register/RegisterPage';
import CreateEntryPage from './components/entries/create/CreateEntryPage';
import EditEntryPage from './components/entries/edit/EditEntryPage';
import NotFoundPage from './components/404/NotFoundPage';
import UserPage from './components/entries/user/UserPage';

export default (
  <Route path="/" component={App} >
    <IndexRoute component={MainPage} />
    <Route path="main" component={MainPage} />
    <Route path="signin" component={SigninPage} />
    <Route path="register" component={RegisterPage} />
    <Route path="createentry" component={CreateEntryPage} />
    <Route path="editentry" component={EditEntryPage} />
    <Route path="userpage" component={ UserPage } />
    <Route path='*' component={NotFoundPage} />
  </Route>
)
