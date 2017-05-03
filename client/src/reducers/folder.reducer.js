const initialState = {
  fetching: false,
  fetched: false,
  error: null,
  data: null,
  confirmDelete: null,
  folder: null,
  editFolder: false,
  documents: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FETCHED_CURRENT_USER_FOLDERS': {
      return {
        ...state,
        data: action.payload
      };
    }
    case 'GOT_FOLDER': {
      return {
        ...state,
        folder: action.payload
      };
    }
    case 'GOT_FOLDER_DOCUMENTS': {
      return {
        ...state,
        documents: action.payload
      };
    }
    case 'EDIT_FOLDER': {
      return {
        ...state,
        editFolder: action.payload
      };
    }
    case 'CLEAR_EDIT_FOLDER': {
      return {
        ...state,
        editFolder: false
      };
    }
    case 'UPDATED_FOLDER': {
      return { ...state };
    }
    case 'CREATED_FOLDER': {
      const cloneState = { ...state };
      cloneState.data.push(action.payload);
      return cloneState;
    }
    case 'CONFIRM_DELETE_FOLDER': {
      return { ...state, confirmDelete: action.payload };
    }
    case 'DELETED_FOLDER': {
      const cloneState = { ...state };
      cloneState.data = [...state.data]
        .filter(data => (data.id !== action.payload));
      return cloneState;
    }
    case 'CLEAR_FOLDER_DELETE_CONFIRMATION': {
      return { ...state, confirmDelete: null };
    }
    case 'ADDED_DOCUMENT_TO_FOLDER': {
      return {
        ...state
      };
    }
    case 'ERROR_ADDING_DOCUMENT_TO_FOLDER': {
      return {
        ...state,
        error: action.payload
      };
    }
    default: {
      return { ...state };
    }
  }
};
