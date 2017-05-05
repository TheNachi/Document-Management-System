import { SET_USERS, USER_FETCHED, USER_UPDATED, USER_DELETED } from '../actions/types';

export default function users(state = [], action = {}) {
  switch (action.type) {
    case USER_FETCHED:
      return [
        ...state.filter(user => user.id !== action.user.id),
        Object.assign({}, action.user),
      ];
    case USER_UPDATED:
      return [
        ...state.filter(user => user.id !== action.user.id),
        Object.assign({}, action.user),
      ];
    case USER_DELETED:
      return state.filter(item => item.id !== action.userId);
    case SET_USERS:
      return action.users;
    default: return state;
  }
}
