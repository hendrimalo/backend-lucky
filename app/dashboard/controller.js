const { format } = require('date-fns');
const Reservation = require('../reservation/model');
const User = require('../user/model');
const Transaction = require('../transaction/model');
const Review = require('../review/model');

module.exports = {
  index: async (req, res) => {
    try {
      const reservation = await Reservation.find({
        date: format(new Date(), 'yyyy-MM-dd'),
      }).sort({ date: -1, time: -1 });
      const todayReservation = await Reservation.find({
        date: format(new Date(), 'yyyy-MM-dd'),
      }).count();
      const userTotal = await User.find().count();
      const todayIncome = await Transaction.aggregate([
        { $group: { _id: null, total: { $sum: '$total' } } },
      ]);
      const rating = await Review.aggregate([
        { $group: { _id: null, avg: { $avg: '$rating' } } },
      ]);

      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };

      res.render('master/dashboard/view-dashboard', {
        alert,
        username: req.session.user.username,
        role: req.session.user.role,
        reservation,
        todayReservation,
        todayIncome,
        userTotal,
        rating,
      });
    } catch (error) {
      console.log(error);
    }
  },
};
