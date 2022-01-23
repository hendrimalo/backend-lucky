const { format } = require('date-fns');
const { alertError, alertSuccess } = require('../../utils/response');
const Transaction = require('./model');
const Member = require('../member/model');
const Product = require('../service/model');

module.exports = {
  index: async (req, res) => {
    try {
      const transaction = await Transaction.find()
        .sort({ date: -1, time: -1 });
      const member = await Member.find({ status: 'Active' });
      const product = await Product.find().select('name price');

      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };

      res.render('master/transaction/view-transaction', {
        alert,
        username: req.session.user.username,
        role: req.session.user.role,
        transaction,
        member,
        product,
      });
    } catch (error) {
      console.log(error);
    }
  },
  detail: async (req, res) => {
    try {
      const { id } = req.params;
      const transaction = await Transaction.findById({ _id: id })
        .populate('reservationId', 'date time');

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
      const { member, payment, productId } = req.body;

      const product = await Product.findById({ _id: productId });

      const payload = {
        date: format(new Date(), 'yyyy-MM-dd'),
        time: format(new Date(), 'hh:mm a'),
        member,
        payment,
        product: product.name,
        total: product.price,
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
