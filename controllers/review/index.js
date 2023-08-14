const { Review } = require('../../models');
const { limit } = require('../../config/params');
const { alertError, alertSuccess } = require('../../utils/response');

module.exports = {
  index: async (req, res) => {
    try {
      const { page } = req.query;
      const offside = (page - 1) * limit;

      const review = await Review.find()
        .populate('userId', 'username')
        .populate('transactionId', 'date')
        .limit(limit)
        .skip(offside);

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

      const review = await Review.findById({ _id: id })
        .populate('userId')
        .populate('transactionId', 'member date');

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
      alertError(req, 'detail', 'reservation', error);

      res.redirect('/transaction');
    }
  },
};
