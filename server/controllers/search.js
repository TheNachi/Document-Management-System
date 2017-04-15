import db from '../models/index';

const searchDoc = (req, res) => {
  if (req.query.q) {
    db.sequelize.query(`SELECT * FROM "Documents" WHERE title LIKE '%${req.query.q}%'`)
      .then((result) => {
        res.status(200).json(result[0]);
      });
  } else {
    res.status(400).json({
      error_code: 'Invalid query',
      message: 'Seems you sent a bad request'
    });
  }
};

const searchUser = (req, res) => {
  if (req.query.q) {
    db.sequelize.query(`SELECT * FROM "Users" AS "Users" WHERE username LIKE '%${req.query.q}%'`)
      .then((result) => {
        res.status(200).json(result[0]);
      });
  } else {
    res.status(400).json({
      error_code: 'Invalid query',
      message: 'Seems you sent a bad request'
    });
  }
};

export { searchDoc, searchUser };
