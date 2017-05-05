import { combineReducers } from 'redux';
import auth from './auth';
import documents from './documents';
import admin from './admin';
import search from './search';
import profile from './profile';

export default combineReducers({
  auth,
  documents,
  admin,
  search,
  profile,
});
