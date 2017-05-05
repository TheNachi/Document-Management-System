import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Pagination } from 'react-materialize';
import UsersList from './UsersList';
import { fetchUsers, deleteUser } from '../../actions/userActions';

class UsersPage extends React.Component {
  constructor() {
    super();
    this.displayUsers = this.displayUsers.bind(this);
  }
  componentDidMount() {
    this.props.fetchUsers();
  }

  displayUsers(pageNumber) {
    const offset = (pageNumber - 1) * this.props.metadata.pageSize;
    this.props.fetchUsers(offset);
  }

  render() {
    const { totalCount, pageSize, currentPage, pageCount } = this.props.metadata;
    return (
      <div>
        <h3>Registered Users</h3>
        <UsersList
          users={this.props.users}
          deleteUser={this.props.deleteUser}
          auth={this.props.auth}
        />
        <Pagination
          items={pageCount}
          activePage={currentPage}
          maxButtons={Math.ceil(totalCount / pageSize)}
          onSelect={this.displayUsers}
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
  metadata: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    users: state.users,
    auth: state.auth,
    metadata: state.paginate,
  };
}

export default connect(mapStateToProps, { fetchUsers, deleteUser })(UsersPage);
