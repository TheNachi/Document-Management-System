export default (state = {}, action) => {
  switch (action.type) {
    case 'VALIDATION_ERROR': {
      return {
        ...state,
        error: {
          type: 'validation',
          data: action.payload
        }
      };
    }
    case 'CLEAR_ERROR': {
      return {
        ...state,
        error: null
      };
    }
    default: {
      return { ...state };
    }
  }
};
