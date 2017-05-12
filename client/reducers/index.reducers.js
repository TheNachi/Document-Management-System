import { combineReducers } from 'redux';
import auth from './auth.reducers';
import documents from './documents.reducers';
import users from './users.reducers';
import search from './search.reducers';
import user from './profile.reducers';
import paginate from './paginate.reducers';

export default combineReducers({
  auth,
  documents,
  users,
  search,
  user,
  paginate
});
