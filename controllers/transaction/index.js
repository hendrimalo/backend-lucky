const date = require('../../utils/date');
const { alertError, alertSuccess } = require('../../utils/response');
const { Transaction, Member, Service } = require('../../models');
const { limit } = require('../../config/params');

module.exports = {
  index: async (req, res) => {
    try {
      const { page } = req.query;
      const offside = (page - 1) * limit;

      const transaction = await Transaction.find()
        .sort({ date: -1, time: -1 })
        .populate('memberId', 'username')
        .limit(limit)
        .skip(offside);
      const member = await Member.find({ status: 'Active' });
      const service = await Service.find().select('name price');

      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };

      res.render('master/transaction/view-transaction', {
        alert,
        username: req.session.user.username,
        role: req.session.user.role,
        transaction,
        member,
        service,
      });
    } catch (error) {
      console.log(error);
    }
  },
  detail: async (req, res) => {
    try {
      const { id } = req.params;
      const transaction = await Transaction.findById({ _id: id })
        .populate('reservationId', 'date time')
        .populate('memberId', 'username')
        .populate('userId', 'username');

      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };

      res.render('master/transaction/view-detail', {
        alert,
        username: req.session.user.username,
        role: req.session.user.role,
        transaction,
      });
    } catch (error) {
      alertError(req, 'detail', 'transaction', error);

      res.redirect('/transaction');
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { memberId, payment, serviceId } = req.body;

      const service = await Service.findById({ _id: serviceId });
      const member = await Member.findById({ _id: memberId });

      const payload = {
        date: date.getNowDate(),
        time: date.getNowTime(),
        memberId: member._id,
        payment,
        service: service.name,
        total: service.price,
      };

      const transaction = new Transaction(payload);

      await transaction.save();

      alertSuccess(req, 'create', 'transaction');

      res.redirect('/transaction');
    } catch (error) {
      alertError(req, 'create', 'transaction', error);

      res.redirect('/transaction');
    }
  },
};
