const express = require('express');
const { usersRouter, userPublicRouter } = require('./users');
const { movieRouter } = require('./movies');
const { auth } = require('../middlewares/auth');
const NotFound = require('../errors/notfound');

const routes = express.Router();

routes.use('/', userPublicRouter);

routes.use('/movies', auth, movieRouter);
routes.use('/users', auth, usersRouter);
routes.use('*', auth, (req, res, next) => next(
  new NotFound('Страница не найдена.'),
));

module.exports = { routes };
