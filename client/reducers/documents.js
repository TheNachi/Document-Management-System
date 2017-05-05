import * as types from '../actions/types';

export default function documents(state = [], action = {}) {
  switch (action.type) {
    case types.ADD_DOCUMENT:
      return [
        ...state,
        Object.assign({}, action.document),
      ];
    case types.DOCUMENT_FETCHED:
      return [
        ...state.filter(document => document.id !== action.document.id),
        Object.assign({}, action.document),
      ];
    case types.DOCUMENT_UPDATED:
      return [
        ...state.filter(document => document.id !== action.document.id),
        Object.assign({}, action.document),
      ];
    case types.DOCUMENT_DELETED:
      return [
        ...state.filter(document => document.id !== action.document.id),
      ];
    case types.SET_DOCUMENTS:
      return action.documents;
    case types.CLEAR_DOCUMENTS:
      return action.documents;

    default: return state;
  }
}
