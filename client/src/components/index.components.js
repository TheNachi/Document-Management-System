import React, { Component } from 'react';
import Navbar from './nav.components';

class Index extends Component {
  /**
   * renders the index component
   * @returns {void}
   * @memberOf Index
   */
  render() {
    return (
      <Navbar isLoginActive="active" isSignupActive="" />
    );
  }
}
export default Index;
