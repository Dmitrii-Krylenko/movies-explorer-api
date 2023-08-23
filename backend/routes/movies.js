const express = require('express');
const { celebrate, Joi } = require('celebrate');
const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movie');

const movieRouter = express.Router();
// rout card
movieRouter.get('/', getMovies);

movieRouter.post('/', createMovie);

movieRouter.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),

  }),
}), deleteMovie);

module.exports.movieRouter = movieRouter;
