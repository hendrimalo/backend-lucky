const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

const articleSchema = mongoose.Schema({
  title: {
    type: String,
    require: [true, 'Please check input title'],
    minLength: [8, 'min length input 8 character'],
    maxLength: [40, 'max length input 40 character'],
  },
  desc: {
    type: String,
    require: [true, 'Please check input desc'],
    minLength: [4, 'min length input 4 character'],
    maxLength: [40, 'max length input 40 character'],
  },
  imageId: [{
    type: ObjectId,
    ref: 'Image',
  }],
}, { timestamps: true });

module.exports = mongoose.model('Article', articleSchema);
