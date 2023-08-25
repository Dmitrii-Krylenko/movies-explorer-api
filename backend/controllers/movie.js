const Movie = require('../models/movie');
const BadRequest = require('../errors/badrequesterr');
const NotFound = require('../errors/notfound');
const Forbidden = require('../errors/forbidden');
// rout Movies

module.exports.getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movie) => res.send(movie))
    .catch((err) => next(err));
};

module.exports.createMovie = (req, res, next) => {
  const owner = req.user._id;
  Movie.create({ ...req.body, owner })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequest('Переданы некорректные данные при создании карточки.'));
      }
      return next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFound('Филь с указанным _id не найден.');
      }
      if (String(movie.owner) !== String(req.user._id)) {
        throw new Forbidden('Нет прав для удаления фильма');
      }
      return Movie.findByIdAndRemove(req.params.movieId);
    })
    .then((movie) => res.status(200).send(movie))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequest('Переданы некорректные данные при удалении фильма.'));
      }
      return next(err);
    });
};
