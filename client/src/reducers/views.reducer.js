const initialState = {
  showOnlyDoc: false,
  showOnlyFolder: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_ONLY_FOLDER': {
      return {
        ...state,
        showOnlyFolder: true,
        showOnlyDoc: false
      };
    }
    case 'SHOW_ONLY_DOCUMENT': {
      return {
        ...state,
        showOnlyDoc: true,
        showOnlyFolder: false
      };
    }
    case 'SHOW_ALL': {
      return {
        ...state,
        showOnlyDoc: false,
        showOnlyFolder: false
      };
    }
    default: {
      return { ...state };
    }
  }
};
