import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';

import MainPage from './components/main/MainPage';
import SignupPage from './components/signup/SignupPage';
import RegisterPage from './components/register/RegisterPage';
import CreateEntryPage from './components/entries/create/CreateEntryPage';
import EditEntryPage from './components/entries/edit/EditEntryPage';

export default (
  <Route path="/" component={App} >
    <IndexRoute component={MainPage} />
    <Route path="signup" component={SignupPage} />
    <Route path="register" component={RegisterPage} />
    <Route path="createentry" component={CreateEntryPage} />
    <Route path="editentry" component={EditEntryPage} />
  </Route>
)
