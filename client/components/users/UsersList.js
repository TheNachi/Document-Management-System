import React from 'react';
import UserRow from './UserRow';

export default function UsersList({ users, deleteUser, auth }) {
  const userRows = users.map(user =>
    <UserRow user={user} key={user.id} deleteUser={deleteUser} auth={auth} />);
  return (
    <table className="striped">
      <thead>
        <tr>
          <th>UserName</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Date Joined</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {userRows}
      </tbody>
    </table>
  );
}

UsersList.propTypes = {
  users: React.PropTypes.array.isRequired,
  deleteUser: React.PropTypes.func.isRequired,
  auth: React.PropTypes.object.isRequired,
};
