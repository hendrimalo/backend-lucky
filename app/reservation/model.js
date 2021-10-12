const mongoose = require('mongoose');

const reservationSchema = mongoose.Schema({
  username: {
    type: String,
    require: [true, 'Please check input username'],
    minLength: [4, 'Please check input username'],
    maxLength: [16, 'Please check input username'],
  },
  phoneNumber: {
    type: String,
    require: [true, 'Please check input Phone Number'],
    minLength: [10, 'Please check input Phone Number'],
    maxLength: [13, 'Please check input Phone Number'],
  },
  date: {
    type: Date,
    require: true,
  },
  time: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    enum: ['Waiting', 'Canceled', 'Success'],
    default: 'Waiting',
  },

});

module.exports = mongoose.model('Reservation', reservationSchema);
