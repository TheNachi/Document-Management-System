export default (req, res, next) => {
  if (Object.keys(req.query).length > 0) {
    const isInt = Object.keys(req.query).map((query) => {
      if (isNaN(parseInt(req.query[query], 10))) {
        return true;
      }
      return false;
    });
    if (isInt.indexOf(true) !== -1) {
      return res.status(400).json({
        message: 'Invalid input for query'
      });
    }
  }
  next();
};
