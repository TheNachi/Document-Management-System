/**
 * @param {Array} fields - contains list of required fields
 * @param {Object} values - contains object to be validated
 *
 * @returns {Boolean} - If all required fields are found
 * @returns {String} - If validation fails
 */
function requiredField(fields, values) {
  let errorMessage = '';
  fields.forEach((field) => {
    if ((!values[field] || values[field] === '') && !errorMessage) {
      errorMessage = `${field} is required`;
    }
  });
  return errorMessage || false;
}

export const signup = (values) => {
  const required = requiredField([
    'firstname',
    'lastname',
    'username',
    'password',
    'email'
  ], values);

  if (required) {
    return required;
  } else if (values.firstname.length < 2) {
    return 'First name cannot be less than 2 characters';
  } else if (values.lastname.length < 2) {
    return 'Last name cannot be less than 2 characters';
  } else if (values.username.length < 5) {
    return 'Username cannot be less than 5 characters';
  } else if (values.password.length < 8) {
    return 'password cannot be less than 8 characters';
  } else if (values.password !== values.verifyPassword) {
    return 'Passwords do not match';
  }
  return null;
};

export const login = (values) => {
  const required = requiredField([
    'email',
    'password'
  ], values);

  if (required) {
    return required;
  }
};
