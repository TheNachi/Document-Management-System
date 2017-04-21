import React, { Component } from 'react';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Index from './index.components';
import Login from './login.components';

class App extends Component {
  /**
   * renders the app component
   * @returns {void}
   * @memberOf App
   */
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path="/app/" component={Index} />
          <Route path="/app/login" component={Login} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
