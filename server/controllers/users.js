import jwt from 'jsonwebtoken';
import model from '../models';
import helper from '../helpers/error-render';


const User = {

  create(req, res) {
    model.users.create(req.body)
    .then((result) => {
      res.status(200).json({
        user: result,
        token: jwt.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60 * 3),
          data: result.id
        }, 'secret')
      });
    })
    .catch((errors) => {
      const error = helper(errors);
      res.status(error.status)
        .json({
          error_code: error.error_code,
          message: error.message
        });
    });
  },

  getAllUserDocument(req, res) {
    const id = req.decoded.id;
    let query;
    if (id === parseInt(req.params.id, 10) || (req.admin && !req.adminTarget)) {
      query = { where: { ownerId: req.params.id } };
    } else {
      query = { where: { ownerId: req.params.id, accessId: 1 } };
    }
    model.Document.findAll(query)
  .then((results) => {
    res.status(200).json(results);
  });
  },

  findOne(req, res) {
    const attr = {
      attributes: ['id', 'firstname', 'lastname', 'username', 'email', 'roleId']
    };
    if (req.admin) {
      attr.attributes.push('password', 'createdAt', 'updatedAt');
    }
    model.Users.findById(req.params.id, attr)
    .then((user) => {
      res.status(200).json(user);
    }).catch((errors) => {
      const error = helper(errors);
      res.status(error.status)
        .json({
          error_code: error.error_code,
          message: error.message
        });
    });
  },

  findAll(req, res) {
    const query = {
      where: {},
      attributes: ['id', 'firstname', 'lastname', 'username',
        'email', 'roleId'] };
    if (req.admin) {
      query.attributes.push('password', 'createdAt', 'updatedAt');
    }
    if (req.query) {
      query.limit = req.query.limit || null;
      query.offset = req.query.offset || 0;
    }
    model.Users.findAll(query)
    .then((users) => {
      res.status(200).json(users);
    });
  },

  updateUser(req, res) {
    const id = req.decoded.id;
    let query;
    if (req.admin
    && Object.keys(req.body).length === 1
    && req.body.roleId
    && !req.adminTarget) {
      query = req.body;
    } else if (req.body.roleId && !req.admin) {
      return res.status(401).json({
        error_code: 'Unauthorized',
        message: 'Only and admin user can promote other users'
      });
    } else if (req.params.id
    && parseInt(req.params.id, 10) === id) {
      query = req.body;
    } else {
      return res.status(401).json({
        error_code: 'Unauthorized',
        message: `Cannot update properties of another 
        ${(req.adminTarget) ? 'admin' : 'user'}`
      });
    }
    model.Users.update(query, { where: {
      id: req.params.id
    } }).then(() => {
      res.sendStatus(204);
    }).catch((errors) => {
      const error = helper(errors);
      res.status(error.status)
      .json({
        error_code: error.error_code,
        message: error.message
      });
    });
  },

  deleteUser(req, res) {
    if (req.adminTarget && req.decoded.id !== req.params.id) {
      return res.status(401).json({
        error_code: 'Unauthorized',
        message: 'you cannot delete an admin'
      });
    } else if (!req.admin && req.decoded.id !== req.params.id) {
      return res.status(401).json({
        error_code: 'Unauthorized',
        message: 'you cannot delete another user'
      });
    }
    model.Users.destroy({ where: {
      id: req.params.id
    } }).then(() => {
      res.sendStatus(204);
    }).catch((errors) => {
      const error = helper(errors);
      console.log(errors);
      res.status(error.status)
      .json({
        error_code: error.error_code,
        message: error.message
      });
    });
  },

  login(req, res) {
    if (req.body.email && req.body.password) {
      const email = req.body.email;
      const password = req.body.password;
      model.Users.findOne({ where: { email } })
      .then((user) => {
        if (user) {
          if (user.isPassword(user.password, password)) {
            const payload = { id: user.id };
            res.status(200).json({
              token: jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60 * 3),
                data: payload
              }, process.env.JWT_SECRET)
            });
          } else {
            res.status(401).json({
              error_code: 'Unauthorized Access',
              message: 'email/password do not match'
            });
          }
        } else {
          res.status(401).json({
            error_code: 'Unauthorized Access',
            message: 'email/password do not match'
          });
        }
      })
      .catch(() => res.sendStatus(404));
    } else {
      res.status(401).json({
        error_code: 'Unauthorized Access',
        message: 'email/password do not match'
      });
    }
  }


};

export default User;
