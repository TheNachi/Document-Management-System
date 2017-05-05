import jwt from 'jsonwebtoken';
import config from '../config';
import { Role } from '../models';

export default {
  verifyToken(req, res, next) {
    const token = req.headers.authorization || req.headers['x-access-token'];
    if (!token) {
      return res.status(401).send({ message: 'Unauthorized Access' });
    }

    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: 'Invalid Token' });
      }
      req.decoded = decoded;
      next();
    });
  },

  permitAdmin(req, res, next) {
    Role.findById(req.decoded.RoleId)
      .then((role) => {
        if (role.title === 'admin') {
          next();
        } else {
          return res.status(403).send({ message: 'You are not an admin' });
        }
      });
  }
};

