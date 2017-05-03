import db from '../models/index';

export default (req, res, next) => {
  db.users.findById(req.decoded.id)
    .then((user) => {
      req.userRole = user.roleId;
      if (req.params.id) {
        db.users.findById(req.params.id)
          .then((targetUser) => {
            req.targetRole = targetUser.roleId;
            next();
          })
          .catch(() => {
            res.status(400).json({
              message: 'Sorry an error occured'
            });
          });
      } else {
        next();
      }
    })
    .catch(() => {
      res.status(400).json({
        message: 'Sorry an error occured'
      });
    });
};
