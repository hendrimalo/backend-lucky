const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

const reservationSchema = mongoose.Schema({
  username: {
    type: String,
    require: [true, 'Please check input username'],
    minLength: [4, 'min length input 4 character'],
    maxLength: [16, 'max length input 16 character'],
  },
  userStatus: {
    type: String,
    enum: ['Member', 'Non Member'],
  },
  phoneNumber: {
    type: String,
    require: [true, 'Please check input Phone Number'],
    minLength: [10, 'min length input 10 character'],
    maxLength: [13, 'max length input 13 character'],
  },
  date: {
    type: String,
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
  transactionId: {
    type: ObjectId,
    ref: 'Transaction',
  },

});

module.exports = mongoose.model('Reservation', reservationSchema);
