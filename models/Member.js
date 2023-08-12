/* eslint-disable no-useless-catch */
/* eslint-disable func-names */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const HASH_ROUND = 10;

const memberSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please check input username'],
    minLength: [4, 'min length input 4 character'],
    maxLength: [16, 'max length input 16 character'],
  },
  password: {
    type: String,
    required: [true, 'Please check input password'],
    minLength: [6, 'min length input 6 character'],
    maxLength: [16, 'max length input 16 character'],
  },
  role: {
    type: String,
    enum: ['Master', 'Admin'],
    required: [true, 'Please check input role'],
  },
  status: {
    type: String,
    enum: ['Active', 'Non Active'],
    default: 'Active',
  },
});

// validate hashing before write on MongoDB
memberSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, HASH_ROUND);
  next();
});

// validate unique username before write on MongoDB
memberSchema.path('username').validate(async function (value) {
  try {
    const count = await this.model('Member').countDocuments({ username: value });
    if (count) {
      throw new Error('member is already registered');
    }
    return !count;
  } catch (err) {
    throw err;
  }
}, (attr) => `member ${attr.value} is already registered`);

module.exports = mongoose.model('Member', memberSchema);
