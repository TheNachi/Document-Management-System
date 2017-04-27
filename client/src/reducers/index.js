import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import reduceReducers from 'reduce-reducers';
import users from './user.reducer';
import error from './error.reducer';
import auth from './auth.reducer';

const combinedReducers = combineReducers({
  users,
  form,
  error,
  auth
});

export default reduceReducers(combinedReducers);
