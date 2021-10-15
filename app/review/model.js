const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Please check input name'],
  },
  review: {
    type: String,
    require: [true, 'Plase check input review'],
    maxLength: 60,
  },
  rating: {
    type: String,
    enum: ['Kecewa', 'Tidak Puas', 'Kurang Puas', 'Puas', 'Sangat Puas'],
  },
});

module.exports = mongoose.model('Review', reviewSchema);
