const authorization = (req, res, next) => {
  req.user = {_id: '5df7b3c969fae7001f721230'};
  next();
};

module.exports = authorization;