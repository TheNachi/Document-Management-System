import bcrypt from 'bcrypt';
import isEmpty from 'lodash/isEmpty';
import jwt from 'jsonwebtoken';
import { User, Role, ExpiredToken } from '../models';
import config from '../config';
import Helper from '../helpers/paginateHelper';
import UsersHelper from '../helpers/helper';

const Users = {

  /**
   * Create a user
   * Route: POST: /users
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response|void} response object or void
   */
  create(req, res) {
    User.create(req.userInput).then((user) => {
      const token = UsersHelper.getToken(user);
      user = UsersHelper.permittedAttributes(user);
      res.status(201).send({ token, expiresIn: 86400, user });
    });
  },

  /**
   * Get all users
   * Route: GET: /users
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void} no returns
   */
  list(req, res) {
    const query = {
      attributes: UsersHelper.getUserAttribute(),
      include: [{
        model: Role,
        as: 'Role',
      }],
      limit: req.query.limit || 10,
      offset: req.query.offset || 0,
      order: [['createdAt', 'DESC']]
    };
    User.findAndCountAll(query).then((users) => {
      const condition = {
        count: users.count,
        limit: query.limit,
        offset: query.offset
      };
      delete users.count;
      const pagination = Helper.pagination(condition);
      res.status(200)
        .send({
          pagination,
          rows: users.rows
        });
    });
  },

  /**
   * Get a particular user
   * Route: GET: /users/:id
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response|void} response object or void
   */
  retrieve(req, res) {
    User.findById(req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(404)
            .send({ message: `User with id: ${req.params.id} not found` });
        }
        user = UsersHelper.permittedAttributes(user);
        res.send(user);
      });
  },

  /**
   * Update a particular user
   * Route: PUT: /users/:id
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response|void} response object or void
   */
  update(req, res) {
    User.findById(req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(404)
            .send({ message: `User with id: ${req.params.id} not found` });
        }
        user.update(req.body)
          .then((updatedUser) => {
            updatedUser = UsersHelper.permittedAttributes(updatedUser);
            res.send(updatedUser);
          });
      });
  },

  /**
   * Delete a particular user
   * Route: DELETE: /users/:id
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response|void} response object or void
   */
  destroy(req, res) {
    User.findById(req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(404)
            .send({ message: `User with id: ${req.params.id} not found` });
        }
        user.destroy()
          .then(() => res.send({ message: 'User deleted successfully.' }));
      });
  },

  /**
   * Login user
   * Route: POST: /users/login
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response|void} response object or void
   */
  login(req, res) {
    const { identifier, password } = req.body;

    User.findOne({
      where: {
        $or: [{ username: identifier }, { email: identifier }]
      }
    })
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = UsersHelper.getToken(user);
        user = UsersHelper.permittedAttributes(user);
        res.status(201).send({ token, expiresIn: 86400, user });
      } else {
        res.status(401)
        .send({
          message: 'Please enter a valid username/email or password to log in'
        });
      }
    });
  },

  /**
   * Logout user
   * Route: POST: /users/logout
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response|void} response object or void
   */
  logout(req, res) {
    ExpiredToken.create({ token: req.headers.authorization })
      .then(() => {
        res.status(204).send({ message: 'Logout successful.' });
      });
  },

  /**
   * Search for a user
   * Route: GET: /search/users?q={queryParam}
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void} no returns
   */
  search(req, res) {
    const query = {
      where: {
        $or: [{
          username: {
            $iLike: `%${req.query.q}%`
          }
        }, {
          firstName: {
            $iLike: `%${req.query.q}%`
          }
        }, {
          lastName: {
            $iLike: `%${req.query.q}%`
          }
        }, {
          email: {
            $iLike: `%${req.query.q}%`
          }
        }],
      },
      limit: req.query.limit || 10,
      offset: req.query.offset || 0,
      order: [['createdAt', 'DESC']]
    };
    User.findAndCountAll(query).then((users) => {
      const results = users.rows.map(user => UsersHelper.permittedAttributes(user));
      const condition = {
        count: users.count,
        limit: query.limit,
        offset: query.offset
      };
      delete users.count;
      const pagination = Helper.pagination(condition);
      res.status(200)
        .send({
          pagination,
          rows: results
        });
    });
  }
};

export default Users;
