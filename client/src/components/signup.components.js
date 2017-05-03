import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import signupUser from '../actions/signup.action';
import { signup } from '../utilities/validateForm';
import Navbar from './common/nav.components';
import PageCenter from './common/center.components';
import ReduxFormSignup from './common/signupForm.components';
import { clearError, validationError } from '../actions/error.action';

@connect(store => ({
  user: store,
  form: store.form,
  error: store.error.error,
  auth: store.auth
}))
/**
 * React component for Signup.
 * @class Signup
 */
class Signup extends React.Component {

  /**
    * constructor
    * @param {object} props
    */
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearError = this.clearError.bind(this);
  }

  /**
   * componentDidMount
   * @return {void}
   */
  componentDidMount() {
    this.clearError();
    if (window.localStorage.getItem('token')
    || this.props.auth.isAuthenticated) {
      setTimeout(() => {
        browserHistory.push('/app/');
      }, 1000);
    }
  }

  /**
   * componentWillReceiveProps - invoked before a mounted
   * component receives new props in order to compare current
   * props with new props
   * @param {object} nextProps - contains next props
   * @return {void}
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated === true
        && !this.props.auth.isAuthenticated) {
      setTimeout(() => {
        browserHistory.push('/app/dashboard');
      }, 1000);
    }
  }

  /**
   * Sends an a CLEAR_ERROR action to clear error in store
   * @return {void}
   */
  clearError() {
    this.props.dispatch(clearError());
  }

  /**
   * Handles submittion of form data if validation passes, it
   * sends a login action
   * @param {object} values - contains data the user entered
   * @return {void}
   */
  handleSubmit(values) {
    const validation = signup(values) || null;
    if (validation) {
      this.props.dispatch(validationError(validation));
    } else {
      this.props.dispatch(signupUser(values));
    }
  }

  /**
   * render - description
   *
   * @return {object}  description
   */
  render() {
    return (
      <div id="login-wrapper">
        <Navbar
          type="dark"
          title="Document Management System"
          showSignup={ false }
          loginLink="/app/login"
        />
        <PageCenter>
          <div>
            <ReduxFormSignup
              bg-color="#FFFFFF"
              onSubmit={ this.handleSubmit }
              failed={ this.props.error }
              onCloseAlert={ this.clearError }
            />
          </div>
        </PageCenter>
      </div>
    );
  }
}

export default Signup;
