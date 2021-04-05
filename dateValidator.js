const StatusCodes = require('http-status-codes');

module.exports = (req, res, next) => {
  // new Date(NUMBER*1000)
  const DateHeader = req.headers['date-validation'];
  const DateQuery = req.query['date-validation'];
  if (!DateHeader && !DateQuery) {
    res.sendStatus(StatusCodes.UNAUTHORIZED);
  } else if (DateHeader && DateQuery && (DateHeader !== DateQuery)) {
    res.sendStatus(StatusCodes.UNAUTHORIZED);
  } else {
    const currentTime = Math.round(Date.now() / 1000);
    if (DateHeader && !DateQuery) {
      const EpochHeader = parseInt(DateHeader, 10);
      const HeaderUpperLimit = EpochHeader + 300;
      const HeaderLowerLimit = EpochHeader - 300;
      if (HeaderLowerLimit <= currentTime && HeaderUpperLimit >= currentTime) {
        req.dateValidation = EpochHeader;
        next();
      } else {
        res.sendStatus(StatusCodes.UNAUTHORIZED);
      }
    } else if (!DateHeader && DateQuery) {
      const EpochQuery = parseInt(DateQuery, 10);
      const QueryUpperLimit = EpochQuery + 300;
      const QueryLowerLimit = EpochQuery - 300;
      if (QueryLowerLimit <= currentTime && QueryUpperLimit >= currentTime) {
        req.dateValidation = EpochQuery;
        next();
      } else {
        res.sendStatus(StatusCodes.UNAUTHORIZED);
      }
    } else {
      const Epoch = parseInt(DateHeader, 10);
      const UpperLimit = Epoch + 300;
      const LowerLimit = Epoch - 300;
      if (LowerLimit <= currentTime && UpperLimit >= currentTime) {
        req.dateValidation = Epoch;
        next();
      } else {
        res.sendStatus(StatusCodes.UNAUTHORIZED);
      }
    }
  }
};
