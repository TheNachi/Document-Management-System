import axios from 'axios';
import jwt from 'jsonwebtoken';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import * as types from './types';
import { setDocuments } from './documentActions';

export function setCurrentUser(user) {
  return {
    type: types.SET_CURRENT_USER,
    user,
  };
}

export function logout() {
  return (dispatch) => {
    window.localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
    dispatch(setDocuments([]));
  };
}

export function login(data) {
  return dispatch =>
     axios.post('/users/login', data)
      .then((res) => {
        const token = res.data.token;
        window.localStorage.setItem('jwtToken', token);
        setAuthorizationToken(token);
        dispatch(setCurrentUser(jwt.decode(token)));
      });
}
