const {
  Reservation, User, Transaction, Review, Member, Service,
} = require('../../models');
const date = require('../../utils/date');

module.exports = {
  index: async (req, res) => {
    try {
      const userTotal = await User.find().count();
      const todayIncome = await Transaction.aggregate([
        { $match: { date: date.getNowDate() } },
        { $group: { _id: null, total: { $sum: '$total' } } },
      ]);
      const todayReservation = await Reservation.find({
        date: date.getNowDate(),
      }).count();
      const rating = await Review.aggregate([
        { $group: { _id: null, avg: { $avg: '$rating' } } },
      ]);
      const reservation = await Reservation.find({
        date: date.getNowDate(),
      })
        .populate('userId', 'username phoneNumber')
        .sort({ date: -1, time: -1 });
      const member = await Member.find({ status: 'Active' });
      const service = await Service.find().select('name price');

      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };

      res.render('master/dashboard/view-dashboard', {
        alert,
        username: req.session.user.username,
        role: req.session.user.role,
        reservation,
        service,
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
