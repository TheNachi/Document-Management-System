const initialState = {
  results: {
    users: null,
    docs: null,
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'USERS_SEARCH_RESULT': {
      const cloneState = { ...state };
      cloneState.results.users = action.payload;
      return cloneState;
    }
    case 'DOCUMENTS_SEARCH_RESULT': {
      const cloneState = { ...state };
      cloneState.results.docs = action.payload;
      return cloneState;
    }
    case 'CLEAR_SEARCH': {
      return {
        ...state,
        results: {
          users: null,
          docs: null
        }
      };
    }
    case 'NOT_FOUND_DOCS': {
      const cloneState = { ...state };
      cloneState.results.docs = action.payload;
      return cloneState;
    }
    case 'NOT_FOUND_USERS': {
      const cloneState = { ...state };
      cloneState.results.users = action.payload;
      return cloneState;
    }
    default: {
      return {
        ...state
      };
    }
  }
};
