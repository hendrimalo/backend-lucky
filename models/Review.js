const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

const reviewSchema = mongoose.Schema({
  userId: {
    type: ObjectId,
    required: [true, 'Please check field userId'],
    ref: 'User',
  },
  transactionId: {
    type: ObjectId,
    required: [true, 'Please check field transactionId'],
    ref: 'Transaction',
  },
  review: {
    type: String,
    required: [true, 'Plase check input review'],
    minLength: 4,
    maxLength: 80,
  },
  rating: {
    type: Number,
    required: [true, 'Plase check input rating'],
    min: 0,
    max: 5,
  },
});

module.exports = mongoose.model('Review', reviewSchema);
