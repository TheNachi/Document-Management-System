import React from 'react';
import Navbar from './common/nav.components';

class Index extends React.Component {

  constructor(props) {
    super(props);
    this.currentUser = this.currentUser.bind(this);
}

  currentUser() { //eslint-disable-line
    if (window.localStorage.getItem('token')) {
      return JSON.parse(window.localStorage.getItem('user')).data;
    }
    return null;
  }

  render() {
    return (
      <div>
        <Navbar
          type="dark"
          title="Document Management System"
          loginLink="/app/login"
          signupLink="/app/signup"
          isAuthenticated={
            (this.currentUser()) ?
            {
              username: this.currentUser().username,
              userPage: '/app/user'
            } : null
          }
        />
      </div>

    );
  }
}
export default Index;
