import { requiredField } from '../helpers/helper';

export const signup = (req, res, next) => {
  const emptyField = requiredField([
    'firstname',
    'lastname',
    'username',
    'email',
    'password'
  ], req.body);
  if (emptyField) {
    return res.status(400).json({
      error_code: 'notNull Violation',
      message: emptyField
    });
  }
  next();
};

export const folders = (req, res, next) => {
  const emptyField = requiredField([
    'title'
  ], req.body);
  if (emptyField) {
    return res.status(400).json({
      error_code: 'notNull Violation',
      message: emptyField
    });
  }
  next();
};
