import React from 'react';
import PropTypes from 'prop-types';
import { Link, browserHistory } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar/';

const style = {
  backgroundColor: '#aaa',
  opacity: 0.9,
  position: 'fixed',
  top: 0,
  zindex: 20
};

const authenticated = props => (
  <div>
    <Link to={props.authenticated.userPage} >
      Hi {props.authenticated.username}!
    </Link>
    <Link to={'/app/logout'} >
      <FlatButton
        label="Logout"
        default
      />
    </Link>
  </div>
);

const notAuthenticated = props => (
  <div>
    {
      (props.showLogin) ?
        <Link to={ props.loginLink } className="navbar-login-btn">
          <FlatButton
            label="Login"
            default
          />
        </Link>
      :
        ''
    }
    {
      (props.showSignup) ?
        <Link to={ props.signupLink } className="navbar-signup-btn" >
          <FlatButton
            label="Sign up"
            default
          />
        </Link>
        :
        ''
    }
  </div>

);

class Navbar extends React.Component {

  /**
   * @return {ReactElement} jf
   */
  render() {
    return (
      <AppBar
        iconStyleLeft={ { display: 'none' } }
        className="react-navbar"
        style={ this.props.style }
        title={ this.props.title }
        onTitleTouchTap={ () => browserHistory.push('/app/') }
        iconElementRight={
          (this.props.authenticated) ?
            authenticated(this.props) : notAuthenticated(this.props)
        }
      />
    );
  }
}

Navbar.defaultProps = {
  showLogin: true,
  loginLink: '/login',
  showSignup: true,
  signupLink: '/signup',
  authenticated: null,
  title: window.location.origin.split('//')[1],
  style
};

Navbar.propTypes = {
  title: PropTypes.string,
  loginLink: PropTypes.string,
  signupLink: PropTypes.string,
  authenticated: PropTypes.object,
  showLogin: PropTypes.bool,
  showSignup: PropTypes.bool
};

export default Navbar;
