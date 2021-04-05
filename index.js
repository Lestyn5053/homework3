const Express = require('express');
const BodyParser = require('body-parser');
const Winston = require('winston');
const StatusCodes = require('http-status-codes');
const DateValidator = require('./dateValidator');
const Routes = require('./Routes');
const ErrorHandler = require('./errorHandler');

const app = Express();
app.use(BodyParser.json());

app.use((req, res, next) => {
  if (req.method === 'DELETE') {
    res.sendStatus(StatusCodes.METHOD_NOT_ALLOWED);
  } else {
    next();
  }
});

app.use(DateValidator);

const WinstonLogger = Winston.createLogger({
  transports: [
    new Winston.transports.Console({
      format: Winston.format.json(),
    }),
  ],
});

app.use((req, res, next) => {
  WinstonLogger.log({
    level: 'info',
    message: {
      serverTime: Math.round(Date.now() / 1000),
      method: req.method,
      url: req.url,
      body: req.body,
      params: req.params,
      headers: req.headers,
      dateValidation: req.dateValidation,
    },
  });
  next();
});

app.use(Routes);
app.use(ErrorHandler);

app.listen(8080);
