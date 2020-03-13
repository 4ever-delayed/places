const authorization = (req, res, next) => {
  req.user = { _id: '5e6b97e2b1da465836c3dd5c' };
  next();
};

module.exports = authorization;
