const {
  Reservation, Member, Service, Transaction, User,
} = require('../../models');
const { limit } = require('../../config/params');
const { alertError, alertSuccess } = require('../../utils/response');
const { validateReservation } = require('../../utils/validation');
const { getNowDate, getNowTime } = require('../../utils/date');

module.exports = {
  index: async (req, res) => {
    try {
      const { page } = req.query;
      const offside = (page - 1) * limit;

      const reservation = await Reservation.find()
        .populate('userId', '_id username phoneNumber')
        .limit(limit)
        .skip(offside);
      const user = await User.find();
      const transaction = await Transaction.find().sort({ date: -1, time: -1 });
      const member = await Member.find({ status: 'Active' });
      const service = await Service.find().select('name price');

      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };

      res.render('master/reservation/view-reservation', {
        alert,
        username: req.session.user.username,
        role: req.session.user.role,
        reservation,
        transaction,
        member,
        service,
        user,
      });
    } catch (error) {
      console.log(error);
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { userId, date, time } = req.body;

      validateReservation(date, 'MM/DD/YYYY', time, 'HH:mm a');
      const reservation = await Reservation.create({
        userId,
        date: getNowDate(),
        time,
      });
      reservation.save();

      alertSuccess(req, 'create', 'reservation');
      res.redirect('/reservation');
    } catch (error) {
      alertError(req, 'create', 'reservation', error);
      res.redirect('/reservation');
    }
  },
  actionConfirmReservation: async (req, res) => {
    try {
      const {
        reservId, userId, memberId, payment, serviceId,
      } = req.body;

      const service = await Service.findById({ _id: serviceId });
      const member = await Member.findById({ _id: memberId });

      const payload = {
        reservationId: reservId,
        userId,
        memberId: member._id,
        date: getNowDate(),
        time: getNowTime(),
        payment,
        service: service.name,
        total: service.price,
      };

      const transaction = new Transaction(payload);
      await transaction.save();

      await Reservation.findOneAndUpdate({ _id: reservId }, { status: 'Success', transactionId: transaction._id });

      alertSuccess(req, 'confirm', 'reservation');

      res.redirect('/reservation');
    } catch (error) {
      alertError(req, 'confirm', 'reservation', error);

      res.redirect('/reservation');
    }
  },
  actionStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.query;

      await Reservation.findOneAndUpdate({ _id: id }, { status });

      alertSuccess(req, 'edit', 'reservation');

      res.redirect('/reservation');
    } catch (error) {
      alertError(req, 'edit', 'reservation', error);

      res.redirect('/reservation');
    }
  },
};
