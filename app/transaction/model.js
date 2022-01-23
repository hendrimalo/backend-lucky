const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

const transactionSchema = mongoose.Schema({
  reservationId: {
    type: ObjectId,
    ref: 'Reservation',
  },
  date: {
    type: String,
  },
  time: {
    type: String,
  },
  member: {
    type: String,
    require: [true, 'Please check input member'],
  },
  payment: {
    type: String,
    require: [true, 'Please check input payment'],
  },
  product: {
    type: String,
  },
  total: {
    type: Number,
  },

});

module.exports = mongoose.model('Transaction', transactionSchema);
