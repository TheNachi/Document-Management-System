import * as types from '../actions/types';

export default function documents(state = [], action = {}) {
  switch (action.type) {
    case types.SEARCH_RESULTS:
      return action.documentSearchResult;
    default: return state;
  }
}
