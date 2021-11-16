const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

const transactionSchema = mongoose.Schema({
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
  productId: {
    type: ObjectId,
    ref: 'History Service',
  },
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);
