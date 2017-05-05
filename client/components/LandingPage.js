import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import '../styles/styles.css';
import DocumentsPage from './documents/DocumentsPage';

class LandingPage extends React.Component {
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div id="hero">
        {!isAuthenticated &&
          <div className="container" id="hero-text-container">
            <div className="row">
              <div className="col s12 center-align">
                <h3 id="hero-title" itemProp="description">
                  <span className="bold" >{'Welcome to DMS.    '}</span>
                  <span className="thin">
                  The simplest platform to manage your documents online</span>
                </h3>
              </div>
            </div>
            <div className="row">
              <div className="col s12">
                <div className="center-align">
                  <Link className="btn btn-large create-list-link hero-btn" to="/app/signup">
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          </div>}
        {isAuthenticated && <DocumentsPage />}
      </div>
    );
  }
}

LandingPage.propTypes = {
  auth: React.PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps, null)(LandingPage);
