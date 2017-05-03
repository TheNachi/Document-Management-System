import axios from 'axios';

export default () => {
  axios.defaults.baseURL = window.location.origin;
};
