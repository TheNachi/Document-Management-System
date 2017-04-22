import React, { Component } from 'react';

class Navbar extends Component {
  /**
   * Creates an instance of Navbar.
   * @param {any} props
   * @memberOf Navbar
   */
  constructor(props) {
    super(props);
  }
  /**
   * renders the Nav component
   * @returns {void}
   * @memberOf Navbar
   */
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <div className="brand-logo">Document Management System</div>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li className={this.props.isLoginActive}>
              <a href="login">Login</a>
            </li>
            <li className={this.props.isSignupActive}>
              <a href="app/signup">Signup</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

Navbar.defaultProps = {
  isLoginActive: 'active',
  isSignupActive: ''
};
export default Navbar;
