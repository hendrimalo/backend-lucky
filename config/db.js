const mongoose = require('mongoose');
const config = require('./env');

mongoose.connect(config.mongo_dev, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const conn = mongoose.connection;
conn.on('error', () => console.error.bind(console, 'error connected database'));
conn.once('open', () => console.info('success connected database'));

module.exports = conn;
