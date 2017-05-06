import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import jwt from 'jsonwebtoken';
import routes from './routes';
import setAuthorizationToken from './utils/setAuthorizationToken';
import { setCurrentUser } from './actions/authActions';
import rootReducer from './reducers';

require('./styles/styles.scss');

const store = createStore(
   rootReducer,
   compose(
     applyMiddleware(thunk),
     window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

if (window.localStorage.jwtToken) {
  setAuthorizationToken(window.localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwt.decode(window.localStorage.jwtToken)));
}
render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>, document.getElementById('app'));
