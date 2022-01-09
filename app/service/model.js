const mongoose = require('mongoose');

const serviceSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Please check input name'],
    minLength: [6, 'Please check input name'],
    maxLength: [20, 'Please check input name'],
  },
  desc: {
    type: String,
    require: [true, 'Please check input desc'],
    minLength: [8, 'Please check input desc'],
    maxLength: [60, 'Please check input desc'],
  },
  price: {
    type: Number,
    require: [true, 'Please check input price'],
  },
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
