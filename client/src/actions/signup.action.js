import axios from 'axios';
import jwt from 'jwt-decode';

/**
* loginUser gets user credentials as param and sends it post it
* login api using axios
* @param {Object} signupData - contains email and password
* @return {Object} returns a dispatch action
*/
export default function (signupData) {
  return (dispatch) => {
    axios.post('/api/users', signupData)
      .then((response) => {
        dispatch({
          type: 'CREATE_USER',
          payload: response.data
        });
        dispatch({
          type: 'CLEAR_ERROR'
        });
        const decoded = jwt(response.data.token);
        window.localStorage.setItem('token', response.data.token);
        window.localStorage.setItem('user', JSON.stringify(decoded));
        console.log(response.data);
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
