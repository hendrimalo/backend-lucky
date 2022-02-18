const Reservation = require('../reservation/model');
const User = require('../user/model');
const Transaction = require('../transaction/model');
const Review = require('../review/model');
const Member = require('../member/model');
const Product = require('../service/model');
const date = require('../../utils/date');

module.exports = {
  index: async (req, res) => {
    try {
      const member = await Member.find({ status: 'Active' });
      const product = await Product.find().select('name price');
      const reservation = await Reservation.find({
        date: date.dateJakarta(),
      }).sort({ date: -1, time: -1 });
      const todayReservation = await Reservation.find({
        date: date.dateJakarta(),
      }).count();
      const userTotal = await User.find().count();
      const todayIncome = await Transaction.aggregate([
        { $match: { date: date.dateJakarta() } },
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
        product,
        member,
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
