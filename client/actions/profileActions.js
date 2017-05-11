import axios from 'axios';
import { GET_CURRENT_USER } from './types';

/**
 *
 *
 * @export
 * @param {any} user
 * @returns
 */
export function getCurrentUser(user) {
  return {
    type: GET_CURRENT_USER,
    user
  };
}
/**
 *
 *
 * @export
 * @param {any} userId
 * @returns
 */
export default function getUser(userId) {
  return dispatch => axios.get(`/users/${userId}`);
}

/**
 *
 *
 * @export
 * @param {any} data
 * @param {any} userID
 * @returns
 */
export function updateUser(data, userID) {
  return dispatch => axios.put(`/users/${userID}`, data);
}
