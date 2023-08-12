const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

const reservationSchema = mongoose.Schema({
  userId: {
    type: ObjectId,
    required: [true, 'Please check field userId'],
    ref: 'User',
  },
  transactionId: {
    type: ObjectId,
    ref: 'Transaction',
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Waiting', 'Canceled', 'Success'],
    default: 'Waiting',
  },
});

module.exports = mongoose.model('Reservation', reservationSchema);
