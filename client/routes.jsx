import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App.components.jsx';
import LandingPage from './components/LandingPage.components.jsx';
import SignupPage from './components/signup/SignupPage.components.jsx';
import LoginPage from './components/login/LoginPage.components.jsx';
import ManageDocumentPage from './components/documents/ManageDocumentPage.components.jsx';
import DocumentDetailsPage from './components/documents/DocumentDetailsPage.components.jsx';
import UsersPage from './components/users/UsersPage.components.jsx';
import ProfilePage from './components/profile/ProfilePage.components.jsx';

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
