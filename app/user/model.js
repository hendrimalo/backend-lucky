const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const HASH_ROUND = 10;

const userSchema = mongoose.Schema({
  username: {
    type: String,
    require: [true, 'Please check input username'],
    minLength: [4, 'min length input 4 character'],
    maxLength: [16, 'max length input 16 character'],
  },
  email: {
    type: String,
    require: [true, 'Please check input email'],
  },
  phoneNumber: {
    type: String,
    require: [true, 'Please check input Phone Number'],
    minLength: [10, 'min length input 10 character'],
    maxLength: [13, 'max length input 16 character'],
  },
  password: {
    type: String,
    require: [true, 'Please check input password'],
    minLength: [6, 'min length input 6 character'],
    maxLength: [16, 'max length input 16 character'],
  },
});

userSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, HASH_ROUND);
  next();
});

userSchema.path('username').validate(async function (value) {
  try {
    const count = await this.model('User').countDocuments({ username: value });
    return !count;
  } catch (err) {
    throw err;
  }
}, (attr) => `${attr.value} sudah terdaftar`);

module.exports = mongoose.model('User', userSchema);
