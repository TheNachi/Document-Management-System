import db from '../models/index';

const isAdmin = (req, res, next) => {
  const id = req.decoded.id;
  db.Users.findById(id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          error_code: 'Not found',
          message: 'User not found'
        });
      } else if (user.roleId === 1) {
        req.admin = user;
        next();
      } else {
        next();
      }
    }).catch(() => res.status(400).json({
      message: 'Ooops! An error occured'
    }));
};

const hasAccess = (userId, docAccess) => {
  const authorizedUsers = docAccess.split(';');
  if (authorizedUsers.includes(userId)) {
    return true;
  }
  return false;
};

const targetIsAdmin = (req, res, next) => {
  const id = req.params.id;
  db.Users.findById(id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          error_code: 'Not found',
          message: 'User not found'
        });
      } else if (user.roleId === 1) {
        req.adminTarget = user;
        next();
      } else {
        next();
      }
    }).catch(() => res.status(400).json({
      message: 'Ooops! An error occured'
    }));
};

export { isAdmin, hasAccess, targetIsAdmin };
