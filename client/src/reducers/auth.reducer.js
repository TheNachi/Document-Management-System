export default (state = { isAuthenticated: false }, action) => {
  switch (action.type) {
    case 'LOGIN_USER': {
      return {
        ...state,
        authenticated: true
      };
    }
    case 'LOGOUT_USER': {
      return {
        ...state,
        authenticated: false
      };
    }
    case 'CREATE_USER': {
      return {
        ...state,
        authenticated: true
      };
    }
    default: {
      return { ...state };
    }
  }
};
