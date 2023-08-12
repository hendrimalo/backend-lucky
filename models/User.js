/* eslint-disable no-useless-catch */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { isEmail } = require('validator');

const HASH_ROUND = 10;

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, 'please check input username'],
    minLength: [4, 'min length input 4 character'],
    maxLength: [16, 'max length input 16 character'],
  },
  email: {
    type: String,
    required: [true, 'please check input email'],
    validate: [isEmail, 'invalid input email'],
  },
  phoneNumber: {
    type: String,
    required: [true, 'please check input Phone Number'],
    minLength: [10, 'min length input 10 character'],
    maxLength: [13, 'max length input 16 character'],
  },
  password: {
    type: String,
    required: [true, 'please check input password'],
    minLength: [6, 'min length input 6 character'],
    maxLength: [16, 'max length input 16 character'],
  },
});

// validate hashing before write on MongoDB
userSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, HASH_ROUND);
  next();
});

// validate unique username before write on MongoDB
userSchema.path('username').validate(async function (value) {
  try {
    const count = await this.model('User').countDocuments({ username: value });
    if (count) {
      throw new Error('user is already registered');
    }
    return !count;
  } catch (err) {
    throw err;
  }
}, (attr) => `user ${attr.value} is already registered`);

module.exports = mongoose.model('User', userSchema);
