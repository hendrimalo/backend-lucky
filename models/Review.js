const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

const reviewSchema = mongoose.Schema({
  userId: {
    type: ObjectId,
    required: [true, 'please check field userId'],
    ref: 'User',
  },
  transactionId: {
    type: ObjectId,
    required: [true, 'please check field transactionId'],
    ref: 'Transaction',
  },
  review: {
    type: String,
    required: [true, 'plase check input review'],
    minLength: [4, 'min length input 4 character'],
    maxLength: [100, 'max length input 100 character'],
  },
  rating: {
    type: Number,
    required: [true, 'plase check input rating'],
    min: [0, 'min value input is 0'],
    max: [5, 'max value input is 5'],
  },
});

module.exports = mongoose.model('Review', reviewSchema);
