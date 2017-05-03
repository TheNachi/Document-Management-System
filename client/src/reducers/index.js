import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import reduceReducers from 'reduce-reducers';
import users from './user.reducer';
import error from './error.reducer';
import auth from './auth.reducer';
import documents from './document.reducer';
import folder from './folder.reducer';
import views from './views.reducer';
import search from './search.reducer';

const combinedReducers = combineReducers({
  users,
  form,
  error,
  auth,
  folder,
  documents,
  views,
  search
});

export default reduceReducers(combinedReducers);
