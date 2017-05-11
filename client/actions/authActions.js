import axios from 'axios';
import jwt from 'jsonwebtoken';
import setAuthorizationToken from '../utilities/setAuthorizationToken';
import * as types from './types';


/**
 * Dispatch action to logout a user
 * @returns {Object} function
 */
export function logout() {
  return (dispatch) => {
    window.localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch({
      type: types.SET_CURRENT_USER,
      user: {}
    });
    dispatch({
      type: types.SET_DOCUMENTS,
      documents: [],
    });
  };
}

/**
 * Dispatch action to login a user
 * @param {any} data
 * @returns {Object} function
 */
export function login(data) {
  return dispatch =>
     axios.post('/users/login', data)
      .then((res) => {
        const token = res.data.token;
        window.localStorage.setItem('jwtToken', token);
        setAuthorizationToken(token);
        dispatch({
          type: types.SET_CURRENT_USER,
          user: jwt.decode(token),
        });
      });
}
