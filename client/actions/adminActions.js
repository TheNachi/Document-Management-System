import axios from 'axios';
import { SET_USERS, USER_FETCHED, USER_UPDATED, USER_DELETED } from './types';

export function setUsers(users) {
  return {
    type: SET_USERS,
    users,
  };
}

export function userFetched(user) {
  return {
    type: USER_FETCHED,
    user,
  };
}

export function userUpdated(user) {
  return {
    type: USER_UPDATED,
    user,
  };
}

export function userDeleted(userId) {
  return {
    type: USER_DELETED,
    userId,
  };
}

export function fetchUsers() {
  return (dispatch) => {
    return axios.get('/users')
      .then(res => res.data)
      .then(data => dispatch(setUsers(data)));
  };
}

export function fetchUser(id) {
  return (dispatch) => {
    return axios.get(`/users/${id}`)
      .then(res => dispatch(userFetched(res.data)));
  };
}

export function updateUser(user) {
  return (dispatch) => {
    return axios.put(`/users/${user.id}`, user)
      .then(res => dispatch(userUpdated(res.data)));
  };
}
export function deleteUser(id) {
  return (dispatch) => {
    return axios.delete(`/users/${id}`)
      .then(res => res.data)
      .then(data => dispatch(userDeleted(id)));
  };
}

