const initialState = {
  fetching: false,
  fetched: false,
  error: null,
  data: null,
  confirmDelete: null,
  doc: null,
  editDoc: false,
  documents: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FETCHED_CURRENT_USER_DOCS': {
      console.log(action.payload);
      return {
        ...state,
        data: action.payload,
        doc: null
      };
    }
    case 'EDIT_DOCUMENT': {
      return {
        ...state,
        editDoc: action.payload
      };
    }
    case 'CLEAR_EDIT_DOCUMENT': {
      return {
        ...state,
        editDoc: false
      };
    }
    case 'UPDATED_DOCUMENT': {
      return { ...state };
    }
    case 'GOT_DOCUMENT': {
      return {
        ...state,
        doc: action.payload
      };
    }
    case 'CONFIRM_DELETE_DOCUMENT': {
      return {
        ...state,
        confirmDelete: action.payload
      };
    }
    case 'DELETED_DOCUMENT': {
      const cloneState = { ...state };
      cloneState.data = [...state.data]
        .filter(data => (data.id !== action.payload));
      return cloneState;
    }
    case 'CREATED_DOC': {
      const cloneState = { ...state };
      cloneState.data.push(action.payload);
      return cloneState;
    }
    case 'CLEAR_CONFIRM_DELETE_DOCUMENT': {
      return {
        ...state,
        confirmDelete: null
      };
    }
    case 'GOT_ALL_DOCUMENTS': {
      return {
        ...state,
        documents: action.payload
      };
    }
    default: {
      return { ...state };
    }
  }
};
