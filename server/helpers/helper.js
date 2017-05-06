import jwt from 'jsonwebtoken';
// import config from '../config';
require('dotenv').config();

const UsersHelper = {

  permittedAttributes(user) {
    const attributes = {
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      roleId: user.roleId,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
    return attributes;
  },
  getUserAttribute() {
    return [
      'id',
      'username',
      'firstName',
      'lastName',
      'email',
      'roleId',
      'createdAt',
      'updatedAt'
    ];
  },
  getToken(user) {
    return jwt.sign({
      userId: user.id,
      roleId: user.roleId
    }, process.env.MY_SECRET, { expiresIn: 86400 });
  }

};

export default UsersHelper;
