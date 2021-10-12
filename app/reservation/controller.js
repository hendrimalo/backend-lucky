const Reservation = require('./model');

module.exports = {
  index: async (req, res) => {
    try {
      const reservation = await Reservation.find();

      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };

      res.render('master/reservation/view-reservation', {
        alert,
        reservation,
      });
    } catch (error) {
      console.log(error);
    }
  },
  actionCreate: async (req, res) => {
    try {
      const {
        username, phoneNumber, date, time,
      } = req.body;

      const reservation = await Reservation.create({
        username, phoneNumber, date, time,
      });
      reservation.save();

      req.flash('alertMessage', 'Success create data reservation');
      req.flash('alertStatus', 'success');

      res.redirect('/reservation');
    } catch (error) {
      req.flash('alertMessage', `Failed create data reservation  ${error}`);
      req.flash('alertStatus', 'danger');

      res.redirect('/reservation');
    }
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;

      await Reservation.findOneAndDelete({ _id: id });

      req.flash('alertMessage', 'Success delete data reservation');
      req.flash('alertStatus', 'success');

      res.redirect('/reservation');
    } catch (error) {
      req.flash('alertMessage', `Failed delete data reservation ${error}`);
      req.flash('alertStatus', 'danger');

      res.redirect('/reservation');
    }
  },
};
