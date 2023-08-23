const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
require('dotenv').config();

const { PORT = 3000 } = process.env;
const errorHandler = require('./middlewares/errorhandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { routes } = require('./routes');

const app = express();
app.use(cors({ origin: 'https://api.korolekdiplom.nomoredomainsicu.ru/', credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
const main = async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb', {
  });
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`App listening on port ${PORT}`);
  });
};

main();
