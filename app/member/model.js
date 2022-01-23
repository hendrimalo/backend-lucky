const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const HASH_ROUND = 10;

const memberSchema = mongoose.Schema({
  username: {
    type: String,
    require: [true, 'Please check input username'],
    minLength: [4, 'min length input 4 character'],
    maxLength: [16, 'max length input 16 character'],
  },
  password: {
    type: String,
    require: [true, 'Please check input password'],
    minLength: [6, 'min length input 6 character'],
    maxLength: [16, 'max length input 16 character'],
  },
  role: {
    type: String,
    enum: ['Master', 'Admin'],
    require: [true, 'Please check input role'],
  },
  status: {
    type: String,
    enum: ['Active', 'Non Active'],
    default: 'Active',
  },
});

memberSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, HASH_ROUND);
  next();
});

memberSchema.path('username').validate(async function (value) {
  try {
    const count = await this.model('Member').countDocuments({ username: value });
    return !count;
  } catch (err) {
    throw err;
  }
}, (attr) => `${attr.value} sudah terdaftar`);

module.exports = mongoose.model('Member', memberSchema);
