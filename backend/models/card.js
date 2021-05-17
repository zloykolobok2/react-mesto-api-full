const mogoose = require('mongoose');
const validator = require('validator');

const cardSchema = new mogoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },

  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validator.isURL(v, { protocols: ['http', 'https'] });
      },
      message: () => 'Вы указали неправильный URL',
    },
  },

  owner: {
    type: mogoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },

  likes: [
    {
      type: mogoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
      default: '',
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mogoose.model('card', cardSchema);
