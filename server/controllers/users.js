import jwt from 'jsonwebtoken';
import db from '../models/index';
import errorRender from '../helpers/error-render';
import { paginate } from '../helpers/helper';

const create = (req, res) => {
  if (req.body.roleId === 1) {
    return res.status(400).json({
      message: 'sorry, you can\'t signup as an admin'
    });
  }
  db.users.create(req.body)
    .then((result) => {
      const payload = {
        id: result.id,
        username: result.username,
        roleId: result.roleId
      };
      res.status(200).json({
        user: result,
        token: jwt.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60 * 3),
          data: payload
        }, process.env.JWT_SECRET)
      });
    })
    .catch((errors) => {
      const error = errorRender(errors);
      res.status(error.status)
        .json({
          error_code: error.error_code,
          message: error.message
        });
    });
};

const getAllUserDocuments = (req, res) => {
  const id = req.decoded.id;
  let query;
  if (id === parseInt(req.params.id, 10) || (req.admin && !req.adminTarget)) {
    query = { where: { ownerId: req.params.id } };
  } else if ((id !== parseInt(req.params.id, 10)) && (req.userRole === req.targetRole)) {
    query = `SELECT * FROM "Documents" WHERE "ownerId"=${req.params.id} AND ("accessId"=1 OR "accessId"=3)`;
  } else {
    query = { where: { ownerId: req.params.id, accessId: 1 } };
  }
  if (typeof query === 'object') {
    db.documents.findAll(query)
    .then((results) => {
      res.status(200).json(results);
    });
  } else {
    db.sequelize.query(query)
      .then((results) => {
        res.status(200).json(results[0]);
      });
  }
};

const findOne = (req, res) => {
  const attr = {
    attributes: ['id', 'firstname', 'lastname', 'username', 'email', 'roleId']
  };
  if (req.admin) {
    attr.attributes.push('password', 'createdAt', 'updatedAt');
  }
  db.users.findById(req.params.id, attr)
    .then((user) => {
      res.status(200).json(user);
    }).catch((errors) => {
      const error = errorRender(errors);
      res.status(error.status)
        .json({
          error_code: error.error_code,
          message: error.message
        });
    });
};

const findAll = (req, res) => {
  let limit, offset;
  const query = {
    where: {},
    attributes: ['id', 'firstname', 'lastname', 'username', 'email', 'roleId'] };
  if (req.admin) {
    query.attributes.push('password', 'createdAt', 'updatedAt');
  }
  if (req.query) {
    limit = req.query.limit || 100;
    offset = req.query.offset || 0;
  }
  db.users.findAll(query)
    .then((users) => {
      res.status(200).json(paginate(limit, offset, users, 'users'));
    });
};

const updateUser = (req, res) => {
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
      message: `Cannot update properties of another ${(req.adminTarget) ? 'admin' : 'user'}`
    });
  }
  db.users.update(query, { where: {
    id: req.params.id
  } }).then(() => {
    res.sendStatus(204);
  }).catch((errors) => {
    const error = errorRender(errors);
    res.status(error.status)
      .json({
        error_code: error.error_code,
        message: error.message
      });
  });
};

const deleteUser = (req, res) => {
  if (req.adminTarget && req.decoded.id !== req.params.id) {
    return res.status(401).json({
      error_code: 'Unauthorized',
      message: 'you cannot delete an admin'
    });
  } else if (!req.admin && req.decoded.id !== parseInt(req.params.id, 10)) {
    return res.status(401).json({
      error_code: 'Unauthorized',
      message: 'you cannot delete another user'
    });
  }
  db.users.destroy({ where: {
    id: req.params.id
  } }).then(() => {
    res.sendStatus(204);
  }).catch((errors) => {
    const error = errorRender(errors);
    res.status(error.status)
      .json({
        error_code: error.error_code,
        message: error.message
      });
  });
};

const login = (req, res) => {
  if (req.body.email && req.body.password) {
    const email = req.body.email;
    const password = req.body.password;
    db.users.findOne({ where: { email } })
      .then((user) => {
        if (user) {
          if (user.isPassword(user.password, password)) {
            
            const payload = {
              id: user.id,
              username: user.username,
              roleId: user.roleId
            };
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
};

export {
  create,
  findOne,
  findAll,
  updateUser,
  deleteUser,
  login,
  getAllUserDocuments
 };
