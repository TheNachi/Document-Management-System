const defaultState = {
  fetching: false,
  fetched: false,
  creating: false,
  created: false,
  details: {},
  error: null,
  users: null
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'GOT_USER': {
      return {
        ...state,
        details: action.payload
      };
    }
    case 'GOT_ALL_USERS': {
      return {
        ...state,
        users: action.payload
      };
    }
    case 'ERROR_FETCHING_USERS': {
      return { ...state, creating: false, error: action.payload };
    }
    default: {
      return { ...state };
    }
  }
};
