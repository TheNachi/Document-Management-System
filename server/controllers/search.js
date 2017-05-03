import db from '../models/index';
import { paginate } from '../helpers/helper';

const searchQuery = (table, field, query, as) => {
  const sequelizeQuery = (as) ?
    `SELECT * FROM "${table}" AS "${as}" WHERE ${field} LIKE '%${query}%'`
    :
    `SELECT * FROM "${table}" WHERE ${field} LIKE '%${query}%'`;
  return sequelizeQuery;
};

const searchDoc = (req, res) => {
  const offset = req.query.offset || 0;
  const limit = req.query.limit || 10;
  if (req.query.q) {
    db.sequelize.query(searchQuery('Documents', 'title', req.query.q))
      .then((result) => {
        if (result[0].length < 1) {
          return res.status(404).json({
            message: 'document not found'
          });
        }
        res.status(200).json(paginate(limit, offset, result[0], 'documents'));
      });
  } else {
    res.status(400).json({
      error_code: 'Invalid query',
      message: 'Seems you sent a bad request'
    });
  }
};

const searchUser = (req, res) => {
  const offset = req.query.offset || 0;
  const limit = req.query.limit || 10;
  if (req.query.q) {
    db.sequelize.query(searchQuery('Users', 'username', req.query.q, 'Users'))
      .then((result) => {
        if (result[0].length < 1) {
          return res.status(404).json({
            message: 'user not found'
          });
        }
        res.status(200).json(paginate(limit, offset, result[0], 'users'));
      });
  } else {
    res.status(400).json({
      error_code: 'Invalid query',
      message: 'Seems you sent a bad request'
    });
  }
};

export { searchDoc, searchUser };
