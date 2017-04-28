import React from 'react';
import PropTypes from 'prop-types';
import { Router, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Index from './index.components';
import Login from './login.components';
import Signup from './signup.components';
import Logout from './common/logout.components';
// import User from './user.components';
// import Document from './document.components';
// import Folder from './folder.components';
// import ManageUsers from './manageUsers.components';
// import EditDocument from './editDocument.components';
// import EditProfile from './editProfile.components';

const routes = [
  {
    path: '/app/',
    component: Index
  },
  {
    path: '/app/login',
    component: Login
  },
  {
    path: '/app/signup',
    component: Signup
  },
  {
    path: '/app/logout',
    component: Logout
  } // ,
  // {
  //   path: '/app/dashboard',
  //   component: User
  // },
  // {
  //   path: '/app/document/:id',
  //   component: Document
  // },
  // {
  //   path: '/app/folder/:id',
  //   component: Folder
  // },
  // {
  //   path: '/app/edit/:id',
  //   component: EditDocument
  // },
  // {
  //   path: '/app/manage/users',
  //   component: ManageUsers
  // },
  // {
  //   path: '/app/user/:id/edit',
  //   component: EditProfile
  // }
];

@connect(store => ({
  user: store,
  form: store.form
}))
/**
 * React component for
 * @class App
 */
class App extends React.Component {

  /**
   * @return {ReactElement} jf
   */
  render() {
    return (
      <MuiThemeProvider>
        <Router history={ this.props.history } routes={ routes } />
      </MuiThemeProvider>
    );
  }
}

App.defaultProps = {
  history: browserHistory
};

App.propTypes = {
  history: PropTypes.object
};

export default App;
