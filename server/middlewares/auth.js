import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, 'secret', (err, decoded) => {
      if (err) {
        res.status(401).send({
          success: false,
          message: 'Sorry you don\'t have permission to perform this operation'
        });
      } else {
        req.decoded = decoded.data;
        next();
      }
    });
  } else {
    return res.status(403).send({
      success: false,
      message: 'Sorry you don\'t have permission to perform this operation'
    });
  }
};
