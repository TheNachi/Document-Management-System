import axios from 'axios';

/**
* searchUser
* @param {string} query - string to search for
* @return {object} action to send to reducers
*/
export function searchUser(query) {
  return (dispatch) => {
    axios.get(`/api/v1/search/users/?q=${query}`)
      .then((response) => {
        dispatch({
          type: 'USERS_SEARCH_RESULT',
          payload: response.data
        });
      })
      .catch(() => {
        dispatch({
          type: 'NOT_FOUND_USERS',
          payload: null
        });
      });
  };
}


/**
* searchDocs
* @param {string} query - string to search for
* @return {object} action to send to reducers
*/
export function searchDocs(query) {
  return (dispatch) => {
    axios.get(`/api/search/documents/?q=${query}`)
      .then((response) => {
        dispatch({
          type: 'DOCUMENTS_SEARCH_RESULT',
          payload: response.data
        });
      })
      .catch(() => {
        dispatch({
          type: 'NOT_FOUND_DOCS',
          payload: null
        });
      });
  };
}

/**
* clearSearch
* @return {object} action to send to reducers
*/
export function clearSearch() {
  return {
    type: 'CLEAR_SEARCH'
  };
}
