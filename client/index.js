import React from 'react';
import  { render } from 'react-dom';
import { Router , browserHistory } from 'react-router';
import routes from './routes';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

render(
   <Provider store={store}>
  <Router history={browserHistory} routes={routes} />
  </Provider>
  , document.getElementById("app"));
