const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

const transactionSchema = mongoose.Schema({
  userId: {
    type: ObjectId,
    ref: 'User',
  },
  reservationId: {
    type: ObjectId,
    ref: 'Reservation',
  },
  memberId: {
    type: ObjectId,
    required: [true, 'Please check field memberId'],
    ref: 'Member',
  },
  date: {
    type: String,
    required: [true, 'Please check field date'],
  },
  time: {
    type: String,
    required: [true, 'Please check field time'],
  },
  payment: {
    type: String,
    required: [true, 'Please check input payment'],
  },
  service: {
    type: String,
    required: [true, 'Please check input service'],
  },
  total: {
    type: Number,
  },

});

module.exports = mongoose.model('Transaction', transactionSchema);
