import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import LandingPage from './components/LandingPage';
import SignupPage from './components/signup/SignupPage';
import LoginPage from './components/login/LoginPage';
import ManageDocumentPage from './components/documents/ManageDocumentPage';
import DocumentDetailsPage from './components/documents/DocumentDetailsPage';
import UsersPage from './components/users/UsersPage';
import ProfilePage from './components/profile/ProfilePage';

export default (
  <Route path="/app/" component={App}>
    <IndexRoute component={LandingPage} />
    <Route path="/app/signup" component={SignupPage} />
    <Route path="/app/login" component={LoginPage} />
    <Route path="/app/document" component={ManageDocumentPage} />
    <Route path="/app/document/:id" component={ManageDocumentPage} />
     <Route path="/app/document-details/:id" component={DocumentDetailsPage} />
    <Route path="/app/users" component={UsersPage} />
    <Route path="/app/editprofile" component={ProfilePage} />
  </Route>
);
