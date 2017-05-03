import axios from 'axios';

export function getAllUsers() {
  return (dispatch) => {
    axios.get('/api/users', {
      headers: {
        Authorization: window.getItem('token')
      }
    })
      .then((response) => {
        dispatch({
          type: 'GOT_ALL_USERS',
          payload: response.data
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
}

export function getUserDocs() {
  return (dispatch) => {
    const userId = JSON.parse(window.localStorage.getItem('user')).data.id;
    axios.get(`/api/users/${userId}/documents`, {
      headers: {
        Authorization: window.getItem('token')
      }
    })
      .then((response) => {
        dispatch({
          type: 'FETCHED_DOCUMENTS',
          payload: response.data
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
}

export function getUser() {
  return (dispatch) => {
    const userId = JSON.parse(window.localStorage.getItem('user')).data.id;
    axios.get(`/api/users/${userId}`, {
      headers: {
        Authorization: window.localStorage.getItem('token')
      }
    })
      .then((response) => {
        dispatch({
          type: 'GOT_USER',
          payload: response.data
        });
      })
      .catch((error) => {
        console.log(error.response.data);
      })
  };
}

export function deleteUser(id) {
  return (dispatch) => {
    axios.delete(`/api/users/${id}`)
      .then((response) => {
        dispatch(getUser());
        dispatch(getAllUsers());
        dispatch({
          type: 'DELETE_USER',
          payload: response.data
        });
      });
  };
}

export function updateUser(id, values) {
  return (dispatch) => {
    axios.put(`/api/users/${id}`, values)
      .then((response) => {
        dispatch(getUser());
        dispatch(getAllUsers());
        dispatch({
          type: 'UPDATE_USER_INFO',
          payload: response.data
        });
      });
  };
}
