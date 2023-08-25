const express = require('express');
const { celebrate, Joi } = require('celebrate');

const usersRouter = express.Router();
const userPublicRouter = express.Router();
const {
  createUser, updateUser, login, getCurrentUser, logout,
} = require('../controllers/users');

// Rout user

usersRouter.get('/me', getCurrentUser);

userPublicRouter.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),

  }),
}), createUser);

userPublicRouter.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),

  }),
}), login);

usersRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().min(2).max(30).required(),

  }),
}), updateUser);

usersRouter.post('/signout', logout);

module.exports.usersRouter = usersRouter;
module.exports.userPublicRouter = userPublicRouter;
