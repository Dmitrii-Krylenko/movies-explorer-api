const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');

const moviesSchema = new mongoose.Schema({
  country: { //  страна создания фильма. Обязательное поле-строка.
    type: String, // страна — это строка
    required: true, // оно должно
  },
  director: { //  режиссёр фильма. Обязательное поле-строка.
    type: String, // режиссёр — это строка
    required: true, // оно должно быть
  },
  duration: { //  длительность фильма. Обязательное поле-число.
    type: Number, // длительность фильма — это число
    required: true, // оно должно быть
  },
  year: { //   год выпуска фильма. Обязательное поле-строка.
    type: String, // год выпуска — это строка
    required: true, // оно должно быть
  },
  description: { //   описание фильма. Обязательное поле-строка.
    type: String, // год выпуска — это строка
    required: true, // оно должно быть
  },
  image: { //  ссылка на постер к фильму. Обязательное поле-строка. Запишите её URL-адресом.
    type: String, // имя — это строка
    required: true, // оно должно быть
    validate: {
      validator: (link) => isURL(link),
      message: 'Не верный урл',
    },
  },
  trailerLink: { //  ссылка на трейлер фильма. Обязательное поле-строка. Запишите её URL-адресом.
    type: String, // имя — это строка
    required: true, // оно должно быть
    validate: {
      validator: (link) => isURL(link),
      message: 'Не верный урл',
    },
  },
  thumbnail: { // миниатюрное изображение постера к фильму.
    type: String, // имя — это строка
    required: true, // оно должно быть
    validate: {
      validator: (link) => isURL(link),
      message: 'Не верный урл',
    },
  },
  owner: { // _id пользователя, который сохранил фильм. Обязательное поле.
    type: mongoose.Types.ObjectId, // имя — это строка
    required: true, // оно должно быть
    ref: 'user',
  },
  movieId: { // id фильма, который содержится в ответе сервиса MoviesExplorer.
    type: Number, // имя — это строка
    required: true, // оно должно быть
  },
  nameRU: { //  название фильма на русском языке. Обязательное поле-строка.
    type: String, // название — это строка
    required: true, // оно должно быть
  },
  nameEN: { //  название фильма на английском языке. Обязательное поле-строка.
    type: String, // название — это строка
    required: true, // оно должно быть
  },

});
module.exports = mongoose.model('movies', moviesSchema);
