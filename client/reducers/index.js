import { combineReducers } from 'redux';
import auth from './auth';
import documents from './documents';
import users from './users';
import search from './search';
import user from './profile';
import paginate from './paginate';

export default combineReducers({
  auth,
  documents,
  users,
  search,
  user,
  paginate
});
