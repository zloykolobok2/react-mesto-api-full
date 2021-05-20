// require('dotenv').config();
//
// const { NODE_ENV = 'dev', CRYPT_ROUNDS = 10, JWT_SECRET = '' } = process.env;
import { cryptRounds, jwtSecret } from '../config/app';

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const ConflictError = require('../errors/conflict-err');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const UnauthorizedError = require('../errors/unauthorized-err');
const InternalServerError = require('../errors/internal-server-err');

// const cryptRounds = (NODE_ENV === 'production') ? CRYPT_ROUNDS : 10;
// const jwtSecret = (NODE_ENV === 'production') ? JWT_SECRET : '';

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, parseInt(cryptRounds, 10))
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => {
      res.send({ data: { _id: user._id } });
    })
    .catch((err) => {
      if (err.name === 'MongoError' && err.code === 11000) {
        next(new ConflictError('При регистрации указан email, который уже существует на сервере.'));
        return;
      }

      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании пользователя.'));
        return;
      }

      next(new InternalServerError('Ошибка по умолчанию.'));
    });
};

module.exports.getUserList = (req, res, next) => {
  User.find({})
    .then((userList) => res.send({ data: userList }))
    .catch(() => next(new InternalServerError('Ошибка по умолчанию.')));
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotFoundError('Пользователь по указанному _id не найден.'));
        return;
      }

      next(new InternalServerError('Ошибка по умолчанию.'));
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotFoundError('Пользователь по указанному _id не найден.'));
        return;
      }

      next(new InternalServerError('Ошибка по умолчанию.'));
    });
};

module.exports.updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(_id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при обновлении профиля.'));
        return;
      }
      if (err.name === 'CastError') {
        next(new NotFoundError('Пользователь по указанному _id не найден.'));
        return;
      }

      next(new InternalServerError('Ошибка по умолчанию.'));
    });
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(_id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(err.message));
        return;
      }
      if (err.name === 'CastError') {
        next(new NotFoundError('Пользователь по указанному _id не найден.'));
        return;
      }

      next(new InternalServerError('Ошибка по умолчанию.'));
    });
};

module.exports.login = (req, res, next) => {
  const {
    email, password,
  } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, jwtSecret, { expiresIn: '7d' });

      res.send({ user, token });
    })
    .catch((err) => next(new UnauthorizedError(err.message)));
};
