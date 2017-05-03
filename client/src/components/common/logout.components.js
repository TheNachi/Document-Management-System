import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import logout from '../../actions/logout.action';


@connect(store => ({
  error: store.error.error,
  auth: store.auth
}))
/**
 * React component for
 * @class Logout
 */
class Logout extends React.Component {

  componentDidMount() {
    this.props.dispatch(logout());
  }

  /**
   * componentWillReceiveProps
   * @param {Object} nextProps - next props that component will receive
   * @return {void}
   */
  componentWillReceiveProps(nextProps) {
    if (!this.props.auth.isAuthenticated) {
      browserHistory.push('/app/');
    }
  }
  /**
   * render - description
   *
   * @return {object}  description
   */
  render() {
    return (
      <div>
        logout
      </div>
    );
  }
}

export default Logout;
