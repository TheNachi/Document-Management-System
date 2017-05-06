import React from 'react';

class UserRow extends React.Component {

  render() {
    const { user, deleteUser, auth } = this.props;
    return (
      <tr>
        <td>{user.username}</td>
        <td>{user.firstName}</td>
        <td>{user.lastName}</td>
        <td>{user.email}</td>
        <td>{user.Role.title}
        </td>
        <td>{user.createdAt.substr(0, 10)}</td>
        <td>{auth.user.roleId !== user.roleId &&
          <a href="#" onClick={() => deleteUser(user.id)}>Delete</a>}</td>
      </tr>
    );
  }
}

UserRow.propTypes = {
  user: React.PropTypes.object.isRequired,
  deleteUser: React.PropTypes.func.isRequired,
  auth: React.PropTypes.object.isRequired,
};

export default UserRow;
