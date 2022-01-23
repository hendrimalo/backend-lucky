const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

const reviewSchema = mongoose.Schema({
  username: {
    type: String,
    require: [true, 'Please check input name'],
  },
  review: {
    type: String,
    require: [true, 'Plase check input review'],
    minLength: 4,
    maxLength: 80,
  },
  rating: {
    type: Number,
    require: [true, 'Plase check input rating'],
  },
  transactionId: {
    type: ObjectId,
    ref: 'Transaction',
  },
});

module.exports = mongoose.model('Review', reviewSchema);
