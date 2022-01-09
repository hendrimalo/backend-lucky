const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
  name: {
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
});

module.exports = mongoose.model('Review', reviewSchema);
