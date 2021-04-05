const StatusCodes = require('http-status-codes');

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
};
