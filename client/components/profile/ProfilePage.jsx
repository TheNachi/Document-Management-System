import { connect } from 'react-redux';
import React, { Component } from 'react';
import ProfileForm from './ProfileForm';
import getUser, { updateUser } from '../../actions/profileActions';

class ProfilePage extends Component {

  render() {
    return (
      <div>
        <ProfileForm
          user={this.props.user}
          getUser={this.props.getUser}
          updateUser={this.props.updateUser}
        />
      </div>
    );
  }
}

ProfilePage.propTypes = {
  user: React.PropTypes.number.isRequired,
  getUser: React.PropTypes.func.isRequired,
  updateUser: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.auth.user.userId,
  };
}

export default connect(mapStateToProps, { getUser, updateUser })(ProfilePage);
