const moment = require('moment');
const Reservation = require('../reservation/model');

module.exports = {
  index: async (req, res) => {
    try {
      const reservation = await Reservation.find();

      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };

      res.render('master/dashboard/view-dashboard', {
        alert,
        username: req.session.user.username,
        reservation,
      });
    } catch (error) {
      console.log(error);
    }
  },
};
