export default (state = { isAuthenticated: false }, action) => {
  switch (action.type) {
    case 'LOGIN_USER': {
      return {
        ...state,
        isAuthenticated: true
      };
    }
    case 'LOGOUT_USER': {
      return {
        ...state,
        isAuthenticated: false
      };
    }
    case 'CREATE_USER': {
      return {
        ...state,
        isAuthenticated: true
      };
    }
    default: {
      return { ...state };
    }
  }
};
