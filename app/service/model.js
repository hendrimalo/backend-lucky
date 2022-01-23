const mongoose = require('mongoose');

const serviceSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Please check input name'],
    minLength: [6, 'min length input 6 character'],
    maxLength: [20, 'max length input 20 character'],
  },
  desc: {
    type: String,
    require: [true, 'Please check input desc'],
    minLength: [8, 'min length input 8 character'],
    maxLength: [100, 'max length input 100 character'],
  },
  price: {
    type: Number,
    require: [true, 'Please check input price'],
  },
  status: {
    type: String,
    enum: ['Public', 'Private'],
    default: 'Private',
  },
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
