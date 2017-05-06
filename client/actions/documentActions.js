import axios from 'axios';
import * as types from './types';

/**
 * Dispatched action to create a new document
 * @export
 * @param {any} data
 * @returns {object} object
 */
export function saveDocument(data) {
  return (dispatch) => {
    return axios.post('/documents', data)
       .then((response) => {
         dispatch({
           type: types.ADD_DOCUMENT,
           document: response.data
         });
       });
  };
}

/**
 * Dispatches action to fetch all documents
 * @export
 * @param {*} offset
 * @returns {Array} documents
 */
export function fetchDocuments(offset) {
  const pageOffset = offset || 0;
  return (dispatch) => {
    return axios.get(`/documents?offset=${pageOffset}`)
      .then((res) => {
        dispatch({
          type: types.SET_DOCUMENTS,
          documents: res.data.rows,
        });
        dispatch({
          type: types.SET_PAGINATION,
          pagination: res.data.pagination
        });
      });
  };
}


/**
 * Dispatch action to fetch a particular document
 * @export
 * @param {any} id
 * @returns {object} document
 */
export function fetchDocument(id) {
  return (dispatch) => {
    return axios.get(`/documents/${id}`)
      .then((res) => {
        dispatch({
          type: types.DOCUMENT_FETCHED,
          document: res.data,
        });
      });
  };
}

/**
 * Dispatch action to edit a document
 * @export
 * @param {any} data
 * @returns {object} document
 */
export function updateDocument(data) {
  return (dispatch) => {
    return axios.put(`/documents/${data.id}`, data)
      .then((res) => {
        dispatch({
          type: types.DOCUMENT_UPDATED,
          document: res.data,
        });
      });
  };
}


/**
 * Dispatch action to delete a document
 * @export
 * @param {any} id
 * @returns {object} document id
 */
export function deleteDocument(id) {
  return (dispatch) => {
    return axios.delete(`/documents/${id}`)
      .then((res) => {
        dispatch({
          type: types.DOCUMENT_DELETED,
          documentId: id,
        });
      });
  };
}
