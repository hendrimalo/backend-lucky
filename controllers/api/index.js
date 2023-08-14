const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config/env');
const date = require('../../utils/date');
const validator = require('../../utils/validation');
const {
  Service, Article, Reservation, Review, User, Transaction,
} = require('../../models');

module.exports = {
  home: async (req, res) => {
    try {
      const service = await Service.find()
        .select('_id name desc price');

      const article = await Article.find();

      return res.status(200).json({
        data: {
          service,
          article,
        },
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
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

      return res.status(200).json({ message: 'success created user' });
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
      await User.findOne({ username }).then((user) => {
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

            return res.status(200).json({
              data: { token },
            });
          }
          return res.status(404).json({
            message: 'User not found',
          });
        }
        return res.status(404).json({
          message: 'User not found',
        });
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
      next();
    }
  },
  getService: async (req, res) => {
    try {
      const service = await Service.find({ status: 'Public' });

      return res.status(200).json({
        data: service,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  getReview: async (req, res) => {
    try {
      const review = await Review.find();

      return res.status(200).json({
        data: review,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  getReservation: async (req, res) => {
    try {
      const reservation = await Reservation.find({
        date: { $in: date.getDates(date.getNowDate(), date.threeDays()) },
        status: 'Waiting',
      });

      return res.status(200).json({
        data: reservation,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  postReservation: async (req, res) => {
    try {
      const { date, time } = req.body;

      const user = await User.findOne({ _id: req.user.id });

      validator.validateReservation(date, 'YYYY-MM-DD', time, 'HH:mm');
      const reservation = await Reservation.create({
        userId: user._id,
        date,
        time,
      });

      return res.status(200).json({
        messgae: 'success created reservation',
      });
    } catch (error) {
      if (error.name === 'Validation Date') return res.status(400).json({ message: error.message });
      return res.status(500).json({ message: error.message });
    }
  },
  postReview: async (req, res) => {
    try {
      const { transactionId, review, rating } = req.body;

      const transaction = await Transaction.findById({ _id: transactionId });
      if (transaction.userId.toString() !== req.user.id) {
        return res.status(400).json({
          message: 'not allowed to review this transaction',
        });
      }
      const reviewData = await Review.create({
        userId: req.user.id,
        transactionId,
        review,
        rating,
      });

      return res.status(200).json({
        message: 'success created review',
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  getUserTransaction: async (req, res) => {
    try {
      const transaction = await Transaction.find({ userId: req.user.id });

      return res.status(200).json({
        data: transaction,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};
