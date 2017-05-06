import axios from 'axios';
import * as types from './types';

/**
 * Dispatch action to fetch users
 * @param {number} offset
 * @returns {Array} users
 */
export function fetchUsers(offset) {
  const pageOffset = offset || 0;
  return (dispatch) => {
    return axios.get('/users')
      .then((res) => {
        dispatch({
          type: types.SET_USERS,
          users: res.data.rows,
        });
        dispatch({
          type: types.SET_PAGINATION,
          pagination: res.data.pagination
        });
      });
  };
}

/**
 * Dispatch action to fetch a user
 * @param {any} id
 * @returns {Object} function
 */
export function fetchUser(id) {
  return (dispatch) => {
    return axios.get(`/users/${id}`)
      .then(res => dispatch({
        type: types.USER_FETCHED,
        user: res.data,
      }));
  };
}

/**
 * Dispatch action to update a user
 * @param {any} user
 * @param {any} userId
 * @returns {Object} function
 */
export function updateUser(user, userId) {
  return (dispatch) => {
    return axios.put(`/users/${userId}`, user)
      .then(res => dispatch({
        type: types.USER_UPDATED,
        user: res.data,
      }));
  };
}

/**
 * Dispatches action for delete
 * @param {any} id
 * @returns {Object} function
 */
export function deleteUser(id) {
  return (dispatch) => {
    return axios.delete(`/users/${id}`)
      .then(res => dispatch({
        type: types.USER_DELETED,
        userId: id,
      }));
  };
}

