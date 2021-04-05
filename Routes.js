const StatusCodes = require('http-status-codes');
const Express = require('express');

const Router = Express.Router();

function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

Router.all('/', (req, res) => {
  if (randomNum(0, 1) === 1) {
    res.status(StatusCodes.OK).send('Hello World');
  } else {
    throw new Error('Oops');
  }
});

module.exports = Router;
