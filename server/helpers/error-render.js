export default (error) => {
  const errorList = error.message.split(': ');
  if (errorList[0] === 'This email is already in use'
  || errorList[0] === 'This username is already in use') {
    return {
      status: 409,
      error_code: 'Unique key violation',
      message: errorList[0]
    };
  }
  return {
    status: 400,
    error_code: errorList[0],
    message: errorList[1]
  };
};
