import React from 'react';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import FlatButton from 'material-ui/FlatButton';
import Alert from './alerts.components';

/**
 * React component for ReduxFormLogin.
 * Renders a centered login form using redux-form
 * @class ReduxFormLogin
 */
class ReduxFormLogin extends React.Component {

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
              <h4>
                { this.props.label }
              </h4>
            </div>
            <div className="col s12 m12 l12"
              style={ this.props.formStyle }
            >
              {
                (this.props.failed) ?
                  <Alert
                    info={ { error: this.props.failed.data } }
                    onClose={ this.props.onCloseAlert }
                  />
                  :
                  ''
              }
              <form onSubmit={ handleSubmit }>
                <div>
                  <div className="row">
                    <div className="input-field col s12">
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
                    <div className="input-field col s12">
                      <Field
                        id="password"
                        name="password"
                        component="input"
                        type="password"
                        className="validate"
                      />
                      <label>Password</label>
                    </div>
                  </div>
                </div>
                <div style={ { marginTop: 30 } }>
                  <FlatButton
                    label="login"
                    type="submit"
                    default
                  />
                  <p>
                    No account yet? <Link to="/app/signup">
                      Signup
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </center>
      </div>
    );
  }
}

ReduxFormLogin.defaultProps = {
  style: {
    backgroundColor: '#FFFFFF',
    padding: 0
  },
  labelStyle: {
    backgroundColor: '#A9A9A9',
    color: '#FFFFFF'
  },
  formStyle: {
    padding: 40
  },
  label: 'Welcome back!'
};

export default reduxForm({
  form: 'login'
})(ReduxFormLogin);
