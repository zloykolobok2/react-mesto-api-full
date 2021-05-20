// require('dotenv').config();
//
// const { NODE_ENV = 'dev', SERVER_PORT = 3000, DB_URL = 'mongodb://localhost:27017/mestodb' } = process.env;
import { serverPort, db } from './config/app';

const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const { celebrate, Joi, errors } = require('celebrate');

const helmet = require('helmet');
const cors = require('cors');

const corsOptions = {
  origin: 'https://rnikolaenkov.nomoredomains.icu',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE, OPTION',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
};

const users = require('./routes/users');
const cards = require('./routes/cards');
const routes = require('./routes/routes');

const auth = require('./middlewares/auth');
const error = require('./middlewares/error');

const { login, createUser } = require('./controllers/users');

const { requestLogger, errorLogger } = require('./middlewares/logger');

// const serverPort = (NODE_ENV === 'production') ? SERVER_PORT : 3001;
// const db = (NODE_ENV === 'production') ? DB_URL : 'mongodb://localhost:27017/mestodb';

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);

app.use(helmet());
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
    // avatar: Joi.string().required().regex(/https?:\/\/[a-z\d\-_]+\.[a-z]+/),
    // name: Joi.string().required().min(2).max(30),
    // about: Joi.string().required().min(2).max(30),
  }).unknown(true),
}), createUser);

app.use(auth);
app.use('/users', users);
app.use('/cards', cards);
app.use('*', routes);

mongoose.connect(db, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(errorLogger);

app.use(errors());
app.use(error);

app.listen(serverPort, () => {
  console.info(`Server started on server port ${serverPort}`);
});
