const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const Service = require('../service/model');
const Article = require('../article/model');
const Reservation = require('../reservation/model');
const Review = require('../review/model');
const User = require('../user/model');
const { validationReview, validationReservation } = require('../../config/validation');

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
      const {
        username, email, phoneNumber, password,
      } = req.body;

      const user = await User.create({
        username, email, phoneNumber, password,
      });

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
  getService: async (req, res) => {
    try {
      const service = await Service.find();

      res.status(200).json({
        data: service,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getReview: async (req, res) => {
    try {
      const review = await Review.find();

      res.status(200).json({
        data: review,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getReservation: async (req, res) => {
    try {
      const reservation = await Reservation.find();

      res.status(200).json({
        data: reservation,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  reservation: async (req, res) => {
    try {
      const { errors, isValid } = validationReservation(req.body);

      if (!isValid) {
        return res.status(400).json({
          message: errors,
        });
      }

      const reservation = await Reservation.create({
        username: req.body.username,
        phoneNumber: req.body.phoneNumber,
        date: req.body.date,
        time: req.body.time,
      });

      res.status(200).json({
        data: reservation,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  review: async (req, res) => {
    try {
      const { errors, isValid } = validationReview(req.body);

      // console.log(validationReview(req.body));

      if (!isValid) {
        return res.status(400).json({
          message: errors,
        });
      }

      const reviewData = await Review.create({
        name: req.body.name,
        review: req.body.review,
        rating: req.body.rating,
      });

      res.status(200).json({
        data: reviewData,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },

};
