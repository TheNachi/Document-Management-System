import jwt from 'jsonwebtoken';

require('dotenv').config();

export default (req, res, next) => {
  const token = req.headers.authorization;
  console.log(req.headers);
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log('herererere');
        res.status(401).send({
          error_code: 'Unauthorized',
          message: 'Sorry you don\'t have permission to perform this operation'
        });
      } else {
        req.decoded = decoded.data;
        next();
      }
    });
  } else {
    return res.status(403).send({
      error_code: 'Unauthorized',
      message: 'Sorry you don\'t have permission to perform this operation'
    });
  }
};
