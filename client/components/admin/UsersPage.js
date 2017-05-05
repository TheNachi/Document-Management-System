import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import UsersList from './UsersList';
import { fetchUsers, deleteUser } from '../../actions/adminActions';

class UsersPage extends React.Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {
    return (
      <div>
        <h3>Users List</h3>
        <UsersList
          users={this.props.users}
          deleteUser={this.props.deleteUser}
          auth={this.props.auth}
        />
      </div>
    );
  }
}

UsersPage.propTypes = {
  users: React.PropTypes.array.isRequired,
  fetchUsers: React.PropTypes.func.isRequired,
  deleteUser: React.PropTypes.func.isRequired,
  auth: React.PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    users: state.admin,
    auth: state.auth,
  };
}

export default connect(mapStateToProps, { fetchUsers, deleteUser })(UsersPage);
