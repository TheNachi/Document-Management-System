import React from 'react';
import { Link } from 'react-router';
import { PropTypes } from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import Alert from './alerts.components';

/**
 * React component for ReduxFormSignup.
 * Renders a centered login form using redux-form
 * @class ReduxFormSignup
 */
class ReduxFormSignup extends React.Component {

  /**
   * render - React's render method for ReduxFormLogin.
   * Renders a centered login form
   * @return {object}  description
   */
  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="container row">
        <center>
          <div
            className="z-depth-1 col s12 m6 l6 offset-m3 offset-l3"
            style={ this.props.style }
          >
            <div className="col s12 m12 l12"
              style={ this.props.labelStyle }
            >
              <h5>
                { this.props.label }
              </h5>
            </div>
            <div className="col s12 m12 l12"
              style={ this.props.formStyle }
            >
              <form onSubmit={ handleSubmit }>
                <div>
                  <div className="row">
                    <div className="input-field col s12 m6 l6">
                      <Field
                        className="validate"
                        name="firstname"
                        component="input"
                        type="text"
                      />
                      <label>Enter your firstname</label>
                    </div>
                    <div className="input-field col s12 m6 l6">
                      <Field
                        className="validate"
                        name="lastname"
                        component="input"
                        type="text"
                      />
                      <label>Enter your lastname</label>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="row">
                    <div className="input-field col s12 m6 l6">
                      <Field
                        className="validate"
                        name="username"
                        component="input"
                        type="text"
                      />
                      <label>Enter your Username</label>
                    </div>
                    <div className="input-field col s12 m6 l6">
                      <Field
                        className="validate"
                        name="email"
                        component="input"
                        type="email"
                      />
                      <label>Email</label>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="row">
                    <div className="input-field col s12 m6 l6">
                      <Field
                        id="password"
                        name="password"
                        component="input"
                        type="password"
                        className="validate"
                      />
                      <label>Password</label>
                    </div>
                    <div className="input-field col s12 m6 l6">
                      <Field
                        id="verify-password"
                        name="verifyPassword"
                        component="input"
                        type="password"
                        className="validate"
                      />
                      <label>Verify password</label>
                    </div>
                  </div>
                </div>
                <div style={ { marginTop: 30 } }>
                  <RaisedButton
                    label="Signup"
                    type="submit"
                    primary={ true }
                  />
                  <p>
                    Already have an account? <Link to="/app/login">
                      Login
                    </Link>
                  </p>
                </div>
              </form>
              {
                (this.props.failed) ?
                  <Alert
                    info={ { error: this.props.failed.data } }
                    onClose={ this.props.onCloseAlert }
                  />
                  :
                  ''
              }
            </div>
          </div>
        </center>
      </div>
    );
  }
}

ReduxFormSignup.defaultProps = {
  style: {
    backgroundColor: '#FFFFFF',
    padding: 0,
    marginTop: 50,
    maxHeight: '75vh',
    overflowY: 'scroll'
  },
  labelStyle: {
    backgroundColor: '#48BCDC',
    color: '#FFFFFF'
  },
  formStyle: {
    padding: 40
  },
  label: 'Create an account!'
};

ReduxFormSignup.propTypes = {
  style: PropTypes.object,
  labelStyle: PropTypes.object,
  formStyle: PropTypes.object,
  label: PropTypes.string
};

export default reduxForm({
  form: 'signup'
})(ReduxFormSignup);
