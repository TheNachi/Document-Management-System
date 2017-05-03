import axios from 'axios';

/**
* getUserDocs - send a dispatch action to get all documents of current logged
* in user
* @return {object} - returns dispatch object based on response from server
*/
export function getUserDocs() {
  return (dispatch) => {
    const userId = JSON.parse(window.localStorage.getItem('user')).data.id;
    axios.get(`/api/users/${userId}/documents`)
      .then((response) => {
        dispatch({
          type: 'FETCHED_CURRENT_USER_DOCS',
          payload: response.data
        });
      });
  };
}

/**
* createDoc - send a dispatch action to create a document for current logged
* in user
* @param {object} values - object to create document with
* @return {object} - returns dispatch object based on response from server
*/
export function createDoc(values) {
  return (dispatch) => {
    axios.post('/api/documents', values)
      .then((response) => {
        dispatch({
          type: 'CREATED_DOC',
          payload: response.data
        });
      })
      .catch((error) => {
        dispatch({
          type: 'ERROR_CREATING_DOCUMENT',
          payload: error.response
        });
      });
  };
}

/**
* getDoc - get a single document of the id provided
* @param {integer} id - id of document to get
* @return {object} - returns dispatch object based on response from server
*/
export function getDoc(id) {
  return (dispatch) => {
    axios.get(`/api/documents/${id}`)
      .then((response) => {
        dispatch({
          type: 'GOT_DOCUMENT',
          payload: response.data
        });
      })
      .catch((error) => {
        dispatch({
          type: 'ERROR_GETTING_DOCUMENT',
          payload: error.response
        });
      });
  };
}

/**
* editDoc - dispatch action to prompt an edit dialog
* @param {object} values - data to render edit dialog with
* @return {object} action to send to reducers
*/
export function editDoc(values) {
  return {
    type: 'EDIT_DOCUMENT',
    payload: values
  };
}

/**
* updateDoc - dispatch action to prompt an edit dialog
* @param {object} values - data to update document with
* @param {Boolean} refresh - if set to true, it dispatches an action to get
* current logged in user docs
* @return {object} action to send to reducers
*/
export function updateDoc(values, refresh = true) {
  return (dispatch) => {
    axios.put(`/api/documents/${values.id}`, values)
      .then((response) => {
        if (refresh) {
          dispatch(getUserDocs());
        }
        dispatch({
          type: 'UPDATED_DOCUMENT',
          payload: response.data
        });
      })
      .catch((error) => {
        dispatch({
          type: 'ERROR_UPDATING_DOCUMENT',
          payload: error.response
        });
      });
  };
}


/**
* getAllDocs - sends an action to fetch all documents
* @return {object} action to send to reducers
*/
export function getAllDocs() {
  return (dispatch) => {
    axios.get('/api/documents')
      .then((response) => {
        dispatch({
          type: 'GOT_ALL_DOCUMENTS',
          payload: response.data
        });
      });
  };
}

/**
* deleteDoc
* @param {number} id - id of document to delete
* @param {object} refresh - object containing action to dispatch
* after successful call and payload to pass to action. Set to false by default
* @return {object} action to send to reducers
*/
export function deleteDoc(id, refresh = false) {
  return (dispatch) => {
    axios.delete(`/api/documents/${id}`)
      .then(() => {
        dispatch({
          type: 'DELETED_DOCUMENT',
          payload: id
        });
        if (refresh && !refresh === 'auto') {
          dispatch(refresh.action(refresh.id));
        } else {
          dispatch(getAllDocs());
        }
      }).catch((error) => {
        dispatch({
          type: 'ERROR_DELETING_DOCUMENT',
          payload: error.response.data
        });
      });
  };
}

/**
* clearEditDoc - send an action to notify that the document is no
* longer being edited
* @return {object} - action to send to reducers
*/
export function clearEditDoc() {
  return {
    type: 'CLEAR_EDIT_DOCUMENT'
  };
}


/**
* confirmDeleteDoc - send an action to confirm deletion of document
* @param {object} values - content to render confirmation box with
* @return {object} - action to send to reducers
*/
export function confirmDeleteDoc(values) {
  return {
    type: 'CONFIRM_DELETE_DOCUMENT',
    payload: values
  };
}

/**
* clearConfirmDeleteDoc - send an action to notify that delete confirmation
* is no longer needed
* @return {object} - action to send to reducers
*/
export function clearConfirmDeleteDoc() {
  return {
    type: 'CLEAR_CONFIRM_DELETE_DOCUMENT'
  };
}
