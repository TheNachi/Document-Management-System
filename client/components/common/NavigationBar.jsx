import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';


class NavigationBar extends React.Component {
  logout(e) {
    e.preventDefault();
    this.props.logout();
    this.context.router.push('/app/');
  }
  render() {
    const { isAuthenticated, user } = this.props.auth;
    return (
      <nav className="black-text nav-holder" role="navigation">
        <div className="nav-wrapper container">
          <Link to="/app/" className="brand-logo">Document Management System</Link>
          <ul className="right hide-on-med-and-down" id="mobile-demo">
            <li><Link to="/app/">
              {isAuthenticated ?
                <span>Documents</span> : <span>Home</span>}</Link></li>
            {user.roleId === 1
                && <li><Link to="/app/users"><span>Users</span></Link></li>}
            <li>
              {!isAuthenticated
                && <Link id="login" to="/app/login">Login</Link>}
            </li>
            {isAuthenticated && <li><Link to="/app/editprofile">Profile</Link>
            </li>}
            <li>
              {isAuthenticated
                ? <a href="" onClick={this.logout.bind(this)}>Logout</a>
                : <Link id="signup" to="/app/signup">Sign up</Link>
              }
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

NavigationBar.propTypes = {
  auth: React.PropTypes.object.isRequired,
  logout: React.PropTypes.func.isRequired,
};

NavigationBar.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps, { logout })(NavigationBar);
