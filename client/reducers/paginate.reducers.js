import * as types from '../actions/types';

export default function documents(state = {}, action = {}) {
  switch (action.type) {
    case types.SET_PAGINATION:
      return action.pagination;
    default: return state;
  }
}
