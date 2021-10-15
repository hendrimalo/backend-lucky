const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

const articleSchema = mongoose.Schema({
  title: {
    type: String,
    require: [true, 'Please check input title'],
    minLength: [8, 'Please check input title'],
    maxLength: [40, 'Please check input title'],
  },
  desc: {
    type: String,
    require: [true, 'Please check input desc'],
    minLength: [20, 'Please check input desc'],
    maxLength: [200, 'Please check input desc'],
  },
  imageId: [{
    type: ObjectId,
    ref: 'Image',
  }],
}, { timestamps: true });

module.exports = mongoose.model('Article', articleSchema);
