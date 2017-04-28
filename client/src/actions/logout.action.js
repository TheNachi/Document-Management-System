/**
* loginUser gets user credentials as param and sends it post it
* login api using axios
* @param {Object} loginData - contains email and password
* @return {Object} returns a dispatch action
*/
export default function () {
  window.localStorage.clear();
  return {
    type: 'LOGOUT_USER'
  };
}
