const mongoose = require('mongoose');

const historyServiceSchema = mongoose.Schema({
  name: {
    type: String,
  },
  price: {
    type: String,
  },
}, { timestamps: true });

module.exports = mongoose.model('History Service', historyServiceSchema);
