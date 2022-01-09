const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const HASH_ROUND = 10;

const userSchema = mongoose.Schema({
  username: {
    type: String,
    require: [true, 'Please check input username'],
    minLength: [4, 'Please check input username'],
    maxLength: [16, 'Please check input username'],
  },
  email: {
    type: String,
    require: [true, 'Please check input email'],
  },
  phoneNumber: {
    type: String,
    require: [true, 'Please check input Phone Number'],
    minLength: [10, 'Please check input Phone Number'],
    maxLength: [13, 'Please check input Phone Number'],
  },
  password: {
    type: String,
    require: [true, 'Please check input password'],
    minLength: [6, 'Please check input password'],
    maxLength: [16, 'Please check input password'],
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
