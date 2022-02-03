const Reservation = require('../reservation/model');
const Review = require('./model');

module.exports = {
  index: async (req, res) => {
    try {
      const review = await Reservation.find({ reviewId: { $ne: null } })
        .populate('reviewId')
        .populate('transactionId', 'member');

      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };

      res.render('master/review/view-review', {
        alert,
        username: req.session.user.username,
        role: req.session.user.role,
        review,
      });
    } catch (error) {
      console.log(error);
    }
  },
  detail: async (req, res) => {
    try {
      const { id } = req.params;

      const review = await Reservation.findOne({ reviewId: id })
        .populate('reviewId')
        .populate('transactionId');

      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };

      res.render('master/review/view-detail', {
        alert,
        username: req.session.user.username,
        role: req.session.user.role,
        review,
      });
    } catch (error) {
      console.log(error);
    }
  },
};
