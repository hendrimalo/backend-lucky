const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
  date: {
    type: String,
    default: 'abc',
  },
  member: {
    type: String,
    require: [true, 'Please check input member'],
  },
  product: {
    name: {
      type: String,
      require: [true, 'Please check input name'],
    },
    price: {
      type: String,
      require: [true, 'Please check input price'],
    },
  },

});

module.exports = mongoose.model('Transaction', transactionSchema);
