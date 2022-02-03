const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  jwtKey: process.env.SECRET,
  mongo_dev: process.env.MONGO_DB_DEV,
  mongo_prod: process.env.MONGO_DB_PROD,
};
