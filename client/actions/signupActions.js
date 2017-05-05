import axios from 'axios';
import jwt from 'jsonwebtoken';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import * as types from './types';

/**
 * Dispatch action to sign up a user
 * @param {any} userData
 * @returns {Object} function
 */
export default function userSignupRequest(userData) {
  return (dispatch) => {
    return axios.post('/users', userData)
      .then((res) => {
        const token = res.data.token;
        window.localStorage.setItem('jwtToken', token);
        setAuthorizationToken(token);
        dispatch({
          type: types.SET_CURRENT_USER,
          user: jwt.decode(token)
        });
      });
  };
}

