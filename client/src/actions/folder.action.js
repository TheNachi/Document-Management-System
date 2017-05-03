import axios from 'axios';

export function getUserFolders() {
  return (dispatch) => {
    axios.get('/api/folders')
      .then((response) => {
        dispatch({
          type: 'FETCHED_CURRENT_USER_FOLDERS',
          payload: response.data
        });
      });
  };
}

export function createFolder(value) {
  return (dispatch) => {
    axios.post('/api/folders', value)
      .then((response) => {
        dispatch({
          type: 'CREATED_FOLDER',
          payload: response.data
        });
      }).catch((error) => {
        dispatch({
          type: 'ERROR_CREATING_FOLDER',
          payload: error.response.data
        });
      });
  };
}

export function deleteFolder(value) {
  return (dispatch) => {
    axios.delete(`/api/folders/${value}`)
      .then(() => {
        dispatch({
          type: 'DELETED_FOLDER',
          payload: value
        });
      }).catch((error) => {
        dispatch({
          type: 'ERROR_DELETING_FOLDER',
          payload: error.response.data
        });
      });
  };
}

export function getFolder(id) {
  return (dispatch) => {
    axios.get(`/api/folders/${id}`)
      .then((response) => {
        dispatch({
          type: 'GOT_FOLDER',
          payload: response.data
        });
      })
      .catch((error) => {
        dispatch({
          type: 'ERROR_GETTING_FOLDER',
          payload: error.response
        });
      });
  };
}

export function confirmDeleteFolder(values) {
  return {
    type: 'CONFIRM_DELETE_FOLDER',
    payload: values
  };
}

export function clearConfirmDeleteFolder() {
  return {
    type: 'CLEAR_FOLDER_DELETE_CONFIRMATION'
  };
}

export function editFolder(values) {
  return {
    type: 'EDIT_FOLDER',
    payload: values
  };
}

export function updateFolder(values, refresh = false) {
  return (dispatch) => {
    axios.put(`/api/folders/${values.id}`, values)
      .then((response) => {
        dispatch(getUserFolders());
        dispatch({
          type: 'UPDATED_FOLDER',
          payload: response.data
        });
        if (refresh) {
          dispatch(refresh.action(refresh.payload));
        }
      })
      .catch((error) => {
        dispatch({
          type: 'ERROR_UPDATING_FOLDER',
          payload: error.response.data
        });
      });
  };
}

export function clearEditFolder() {
  return {
    type: 'CLEAR_EDIT_FOLDER'
  };
}

export function getFolderDocs(id) {
  return (dispatch) => {
    axios.get(`/api/folders/${id}/documents`)
      .then((response) => {
        dispatch({
          type: 'GOT_FOLDER_DOCUMENTS',
          payload: response.data
        });
      })
      .catch((error) => {
        dispatch({
          type: 'ERROR_GETTING_FOLDER_DOCUMENTS',
          payload: error.response.data
        });
      });
  };
}

export function addDoc(folderId, doc) {
  return (dispatch) => {
    axios.put(`/api/folders/${folderId}/add`, doc)
      .then((response) => {
        dispatch(getFolderDocs(folderId));
        dispatch({
          type: 'ADDED_DOCUMENT_TO_FOLDER',
          payload: response.data
        });
      })
      .catch((error) => {
        dispatch({
          type: 'ERROR_ADDING_DOCUMENT_TO_FOLDER',
          payload: error.response.data
        });
      });
  };
}
