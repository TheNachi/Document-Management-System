import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import DocumentsPage from './documents/DocumentsPage.components.jsx';

class LandingPage extends React.Component {
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div id="hero">
        {!isAuthenticated &&
          <div className="container" id="hero-text-container">
            <div className="row">
              <div className="col s12 center-align backgrd">
                <h2 id="hero-title" itemProp="description">
                    Manage your documents in an organized way. Create a document,
                  edit it and share it with other users.
                </h2>
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
