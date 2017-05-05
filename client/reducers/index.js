import { combineReducers } from 'redux';
import auth from './auth';
import documents from './documents';
import users from './users';
import search from './search';
import paginate from './paginate';
import user from './profile';

export default combineReducers({
  auth,
  documents,
  users,
  search,
  paginate,
  user
});
