import React from 'react';
import swal from 'sweetalert';

const confirmDeletion = (callback, documentId) => {
  swal({
    title: 'Are you sure?',
    text: 'Would you like to delete this User?',
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#DD6B55',
    confirmButtonText: 'Yes, delete it!',
    closeOnConfirm: false,
    closeOnCancel: false
  },
  (deletionConfirmed) => {
    if (deletionConfirmed) {
      callback(documentId);
      swal('Deleted!', 'The User was successfully deleted.', 'success');
    } else {
      swal('Cancelled!', 'User not deleted.', 'error');
    }
  });
}


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
          <a href="#" onClick={() => confirmDeletion(deleteUser, user.id)}>Delete</a>}</td>
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
