import db from '../models/index';

const cutList = (list, start, end) => {
  let limit = 0;
  const sliced = [];
  list.forEach((item, index) => {
    if (index >= start && limit < end) {
      sliced.push(item);
      limit += 1;
    }
  });
  return sliced;
};

const paginate = (limit, offset, response, field) => {
  const pageCount = Math.ceil(response.length / limit);
  const paginated = { success: {
    paginationMeta: {
      page_count: (pageCount > 1) ? pageCount : 1,
      total_count: response.length,
      page_size: parseInt(limit, 10),
      page: Math.floor(
        (parseInt(limit, 10) + parseInt(offset, 10))
        / parseInt(limit, 10))
    }
  } };
  paginated.success[field] = cutList(response, offset, limit);
  return paginated;
};

const isAdmin = (req, res, next) => {
  const id = req.decoded.id || req.decoded;
  db.users.findById(id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          error_code: 'Not found',
          message: 'User not found'
        });
      } else if (req.decoded.roleId === 1) {
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
  db.users.findById(id)
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

/**
 * @param {Array} fields - contains list of required fields
 * @param {Object} values - contains object to be validated
 *
 * @returns {Boolean} - If all required fields are found
 * @returns {String} - If validation fails return error message
 */
function requiredField(fields, values) {
  let errorMessage = '';
  fields.forEach((field) => {
    if ((!values[field] || values[field] === '') && !errorMessage) {
      errorMessage = `${field} cannot be empty`;
    }
  });
  return errorMessage || false;
}

/**
 * @param {Integer} status - contains status code
 * @param {Object} error - contsains error object
 * @param {Object} res - contains the response object from node
 *
 * @returns {Object} - returns response to be sen
 */
function errorRender(status, error, res) {
  return res.status(status).json({
    message: error.message
  });
}

export {
  paginate,
  requiredField,
  isAdmin,
  hasAccess,
  targetIsAdmin,
  errorRender };
