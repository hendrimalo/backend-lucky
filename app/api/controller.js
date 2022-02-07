const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { format } = require('date-fns');
const config = require('../../config');
const Service = require('../service/model');
const Article = require('../article/model');
const Reservation = require('../reservation/model');
const Review = require('../review/model');
const User = require('../user/model');
const {
  validationReview,
  validationReservation,
} = require('../../config/validation');

module.exports = {
  home: async (req, res) => {
    try {
      const service = await Service.find()
        .select('_id name desc price');

      const article = await Article.find();

      res.status(200).json({
        service,
        article,
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
      const service = await Service.find({ status: 'Public' });

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
      const reservation = await Reservation.find({
        date: format(new Date(), 'yyyy-MM-dd'),
        status: 'Waiting',
      });

      res.status(200).json({
        data: reservation,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  postReservation: async (req, res) => {
    try {
      const { errors, isValid } = validationReservation(req.body);

      if (!isValid) {
        return res.status(400).json({
          message: errors,
        });
      }

      const check = await Reservation.find({
        date: req.body.date,
        time: req.body.time,
      });

      if (!check) {
        const reservation = await Reservation.create({
          username: req.body.username,
          userStatus: req.body.userStatus,
          phoneNumber: req.body.phoneNumber,
          date: req.body.date,
          time: req.body.time,
        });

        res.status(200).json({
          data: reservation,
        });
      } else {
        res.status(500).json({
          message: `the schedule is already filled,
           please change to another time`,
        });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  postReview: async (req, res) => {
    try {
      const { errors, isValid } = validationReview(req.body);

      if (!isValid) {
        return res.status(400).json({
          message: errors,
        });
      }

      const reviewData = await Review.create({
        username: req.body.username,
        review: req.body.review,
        rating: req.body.rating,
      });

      const reservation = await Reservation.findByIdAndUpdate({
        _id: req.body.reservationId,
      }, { reviewId: reviewData._id });

      res.status(200).json({
        data: reservation,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getUserTransaction: async (req, res) => {
    try {
      const { username } = req.query;
      const reservation = await Reservation.find({
        username,
        userStatus: 'Member',
        status: 'Success',
      }).populate('transactionId', 'date payment product total');

      res.status(200).json({
        data: reservation,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getDetailUserTransaction: async (req, res) => {
    try {
      const { id } = req.params;
      const reservation = await Reservation.findById({ _id: id })
        .populate('transactionId')
        .populate('reviewId');

      res.status(200).json({
        data: reservation,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
