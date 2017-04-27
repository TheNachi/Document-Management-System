import axios from 'axios';
import jwt from 'jwt-decode';

/**
* loginUser gets user credentials as param and sends it post it
* login api using axios
* @param {Object} loginData - contains email and password
* @return {Object} returns a dispatch action
*/
export default function (loginData) {
  return (dispatch) => {
    axios.post('/api/users/login', loginData)
      .then((response) => {
        dispatch({
          type: 'LOGIN_USER',
          payload: response.data
        });
        dispatch({
          type: 'CLEAR_ERROR'
        });
        const decoded = jwt(response.data.token);
        window.localStorage.setItem('token', response.data.token);
        window.localStorage.setItem('user', JSON.stringify(decoded));
        axios.defaults.headers.common.Authorization = response.data.token;
      })
      .catch((error) => {
        dispatch({
          type: 'VALIDATION_ERROR',
          payload: error.response.data.message
        });
      });
  };
}
