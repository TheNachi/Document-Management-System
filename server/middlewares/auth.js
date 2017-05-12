import jwt from 'jsonwebtoken';
import { Role, User, Document, ExpiredToken } from '../models/';

export default {
  verifyToken(req, res, next) {
    const token = req.headers.authorization || req.headers['x-access-token'];
    if (!token) {
      return res.status(401).send({ message: 'Unauthorized Access' });
    }
    ExpiredToken.findOne({ where: { token } })
    .then((foundToken) => {
      if (foundToken) {
        return res.status(401).send({ message: 'Unauthorized Access' });
      }
      jwt.verify(token, process.env.MY_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).send({ message: 'Invalid Token' });
        }
        req.decoded = decoded;
        next();
      });
    });
  },

  permitOwner(req, res, next) {
    Document.findById(req.params.id)
      .then((document) => {
        if (document.ownerId === req.decoded.userId) {
          next();
        } else {
          return res.status(401).send({
            message: 'You don\t have the rights to perform this operation'
          });
        }
      }).catch((err) => res.status(404).send({
        message: `Document with ${req.params.id} not found`
      }));
  },
  permitAdmin(req, res, next) {
    Role.findById(req.decoded.roleId)
      .then((role) => {
        if (role.title === 'admin') {
          next();
        } else {
          return res.status(403).send({ message: 'You are not an admin' });
        }
      });
  },

  validateUserInput(req, res, next) {
    let username = /\w+/g.test(req.body.username);
    let firstName = /\w+/g.test(req.body.firstName);
    let lastName = /\w+/g.test(req.body.lastName);
    let email = /\S+@\S+\.\S+/.test(req.body.email);
    let password = /\w+/g.test(req.body.password);

    if (!username) {
      return res.status(400)
        .send({
          message: 'Enter a valid username'
        });
    }
    if (!firstName) {
      return res.status(400)
        .send({
          message: 'Enter a valid firstName'
        });
    }
    if (!lastName) {
      return res.status(400)
        .send({
          message: 'Enter a valid lastName'
        });
    }
    if (!email) {
      return res.status(400)
        .send({
          message: 'Enter a valid email'
        });
    }
    if (!password) {
      return res.status(400)
        .send({
          message: 'Enter a valid password'
        });
    }
    if (req.body.password && req.body.password.length < 8) {
      return res.status(400)
        .send({
          message: 'Minimum of 8 characters is allowed for password'
        });
    }

    User.findOne({ where: { email: req.body.email } })
      .then((user) => {
        if (user) {
          return res.status(409)
            .send({
              message: 'email already exists'
            });
        }
        User.findOne({ where: { username: req.body.username } })
          .then((newUser) => {
            if (newUser) {
              return res.status(409)
                .send({
                  message: 'username already exists'
                });
            }
            username = req.body.username;
            firstName = req.body.firstName;
            lastName = req.body.lastName;
            email = req.body.email;
            password = req.body.password;
            const roleId = req.body.roleId || 2;
            req.userInput =
            { username, firstName, lastName, roleId, email, password };
            next();
          });
      });
  },

  validateLoginInput(req, res, next) {
    if (!req.body.password || !req.body.identifier) {
      return res.status(400)
        .send({
          message: 'Please provide your username/email and password to login'
        });
    }

    const identifier = /\w+/g.test(req.body.identifier);
    const password = /\w+/g.test(req.body.password);

    if (!identifier || !password) {
      return res.status(400)
        .send({
          message: 'Please enter a valid username/email and password'
        });
    }
    next();
  },
};

