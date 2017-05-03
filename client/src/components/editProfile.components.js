import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import Navbar from './common/nav.components';
import Alert from './common/alerts.components';
import CustomDrawer from './customDrawer.components';
import {
  getDoc,
} from '../actions/document.action';

import {
  getUser,
  updateUser
} from '../actions/users.action';

@connect(store => ({
  user: store,
  form: store.form,
  error: store.error.error,
  auth: store.auth,
  docs: store.documents,
  folder: store.folder
}))
class EditProfile extends React.Component {

  constructor(props) {
    super(props);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.onCloseAlert = this.onCloseAlert.bind(this);
    this.state = {
      username: '',
      password: '',
      confirm_password: '',
      error: null
    };
  }

  /**
   * componentDidMount
   * @return {void}
   */
  componentDidMount() {
    if (!window.localStorage.getItem('token')) {
      browserHistory.push('/app/login');
    } else {
      this.props.dispatch(getUser());
      this.props.dispatch(getDoc(this.props.params.id));
    }
    this.props.dispatch(getUser());
  }

  /**
   * componentWillReceiveProps
   * @param {object} nextProps - next props the component will recieve before
   * it re-renders
   * @return {void}
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.user.users.details) {
      this.setState({
        username: nextProps.user.users.details.username,
      });
    }
  }

  handlePasswordChange(event) {
    this.setState({
      password: event.target.value
    });
  }

  handleConfirmChange(event) {
    this.setState({
      confirm_password: event.target.value
    });
  }

  handleUsernameChange(event) {
    this.setState({
      username: event.target.value
    });
  }

  validate(values) {
    if (values.username.length < 5) {
      this.setState({ error: 'Username cannot be less than 5' });
      return false;
    } else if (values.password.length < 8 && !values.password.length < 1) {
      this.setState({ error: 'Password cannot be less than 8' });
      return false;
    } else if (values.password !== values.confirm_password
    && !values.password.length < 1) {
      this.setState({ error: 'Passwords do not match' });
      return false;
    }
    return true;
  }

  handleUpdate() {
    const values = {
      username: this.state.username,
      password: this.state.password,
      confirm_password: this.confirm_password
    };
    if (this.validate(values)) {
      delete values.confirm_password;
      if (values.password.length < 1) {
        delete values.password;
      }
      this.props.dispatch(updateUser(
        this.props.user.users.details.id, values));
      browserHistory.push('/app/dashboard');
    }
  }

  onCloseAlert() {
    this.setState({ error: null });
  }
  render() {
    return (
      <div>
        <Navbar
         type="dark"
         title="iAmDocuman"
         isAuthenticated={ {
           username: 'asheAmao',
           userPage: '/app/dashboard'
         } }
         showSignout={ false }
        />
        <div className="close-drawer">
        </div>
        <CustomDrawer
          title="iAmDocuman"
          username={ this.props.user.users.details.username }
          userRole={ this.props.user.users.details.roleId }
          id={ this.props.user.users.details.id }
          fullname={
            `${this.props.user.users.details.firstname}
             ${this.props.user.users.details.lastname}`}
        />
        <div className="content-display">
            <div className="z-depth-2" id="edit-form-title">
              {
                (this.state.error) ?
                <Alert
                  info={ { error: this.state.error } }
                  onClose={ this.onCloseAlert }
                />
                :
                ''
              }
              <h5>EDIT INFORMATION</h5>
              <div id="edit-form">
                <div className="row">
                  <div className="input-field col s12 m6 l6">
                    <input
                      className="validate"
                      name="firstname"
                      type="text"
                      value={this.props.user.users.details.firstname}
                    />
                  </div>
                  <div className="input-field col s12 m6 l6">
                    <input
                      className="validate"
                      name="lastname"
                      type="text"
                      value={ this.props.user.users.details.lastname }
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12 m6 l6">
                    <input
                      className="validate"
                      name="email"
                      type="text"
                      value={ this.props.user.users.details.email }
                    />
                  </div>
                  <div className="input-field col s12 m6 l6">
                    <input
                      className="validate"
                      name="username"
                      type="text"
                      value={ this.state.username }
                      onChange={ event => this.handleUsernameChange(event) }
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12 m6 l6">
                    <input
                      className="validate"
                      name="password"
                      type="password"
                      value={ this.state.password }
                      onChange={ event => this.handlePasswordChange(event) }
                    />
                    <label>Change your password</label>
                  </div>
                  <div className="input-field col s12 m6 l6">
                    <input
                      className="validate"
                      name="confirm_password"
                      type="password"
                      value={ this.state.confirm_password }
                      onChange={ event => this.handleConfirmChange(event) }
                    />
                    <label>Confirm password</label>
                  </div>
                </div>
              </div>
              <FlatButton
                label="Update Info"
                primary={ true }
                keyboardFocused={ true }
                onTouchTap={ this.handleUpdate }
              />
            </div>
        </div>
      </div>
    );
  }
}

export default EditProfile;
