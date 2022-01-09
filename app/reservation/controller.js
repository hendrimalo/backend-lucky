const Reservation = require('./model');
const Member = require('../member/model');
const Product = require('../service/model');
const Transaction = require('../transaction/model');
const History = require('../history service/model');
const { alertError, alertSuccess } = require('../../utils/response');

module.exports = {
  index: async (req, res) => {
    try {
      const reservation = await Reservation.find();

      const transaction = await Transaction.find().sort({ date: -1 })
        .populate('productId');
      const member = await Member.find();
      const product = await Product.find().select('name price');

      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };

      res.render('master/reservation/view-reservation', {
        alert,
        username: req.session.user.username,
        reservation,
        transaction,
        member,
        product,
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
        id, member, payment, productId,
      } = req.body;

      const product = await Product.findById({ _id: productId });
      const history = await History.create({ name: product.name, price: product.price });

      const payload = {
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
        member,
        productId: history._id,
        payment,
      };

      const transaction = new Transaction(payload);
      await transaction.save();

      await Reservation.findOneAndUpdate({ _id: id }, { status: 'Success' });

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
