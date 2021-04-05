const Express = require('express');
const BodyParser = require('body-parser');
const Winston = require('winston');
const StatusCodes = require('http-status-codes');

const WinstonLogger = Winston.createLogger({
  transports: [
    new Winston.transports.Console({
      format: Winston.format.simple(),
    }),
  ],
});

const app = Express();
app.use(BodyParser.json());

app.use((req, res, next) => {
  if (req.method === 'DELETE') {
    res.sendStatus(StatusCodes.METHOD_NOT_ALLOWED);
  }
});

app.listen(8080);
