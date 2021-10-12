const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const Service = require('../service/model');
const Article = require('../article/model');
const Reservation = require('../reservation/model');
const User = require('../user/model');
// const Review = require('../review/model');

// const { config } = require('dotenv');

module.exports = {
  home: async (req, res) => {
    try {
      const service = await Service.find()
        .select('_id name desc price');

      const article = await Article.find();
      //   const review = await Review.find();

      res.status(200).json({
        service,
        article,
        // review,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  signup: async (req, res, next) => {
    try {
      const { username, password, phoneNumber } = req.body;

      const user = await User.create({ username, password, phoneNumber });

      // delete user._doc.password;

      res.status(201).json({ data: user });
    } catch (error) {
      if (error && error.name === 'ValidationError') {
        return res.status(422).json({
          message: error.message,
          fields: error.errors,
        });
      }
      next(error);
    }
  },
  signin: async (req, res, next) => {
    try {
      const { username, password } = req.body;
      User.findOne({ username }).then((user) => {
        if (user) {
          const validation = bcrypt.compareSync(password, user.password);
          if (validation) {
            const token = jwt.sign({
              user: {
                id: user.id,
                username: user.username,
                phoneNumber: user.phoneNumber,
              },
            }, config.jwtKey);

            res.status(201).json({
              data: { token },
            });
          }
        } else {
          res.status(403).json({
            message: 'User not found',
          });
        }
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
      next();
    }
  },
  booking: async (req, res) => {
    try {
      const { phoneNumber, date, time } = req.body;

      const reservation = await Reservation.create({
        username: req.user.username,
        phoneNumber,
        date,
        time,
      });

      res.status(201).json({
        data: reservation,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

};
