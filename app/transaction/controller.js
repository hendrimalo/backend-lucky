const Transaction = require('./model');
const Member = require('../member/model');
const Product = require('../service/model');

module.exports = {
  index: async (req, res) => {
    try {
      const transaction = await Transaction.find();
      const member = await Member.find();
      const product = await Product.find();

      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };

      res.render('master/transaction/view-transaction', {
        alert,
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
        date, _member,
      } = req.body;

      const payload = {
        date,
        member: _member,
        product: {
          name: 'test payload name',
          price: 'test payload price',
        },
      };

      const transaction = new Transaction(payload);
      await transaction.save();

      req.flash('alertMessage', 'Success create data transaction');
      req.flash('alertStatus', 'success');

      res.redirect('/transaction');
    } catch (error) {
      req.flash('alertMessage', `Failed create data transaction ${error}`);
      req.flash('alertStatus', 'danger');

      res.redirect('/transaction');
    }
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;

      await Transaction.findByIdAndDelete({ _id: id });

      req.flash('alertMessage', 'Success delete data transaction');
      req.flash('alertStatus', 'success');

      res.redirect('/transaction');
    } catch (error) {
      req.flash('alertMessage', 'Failed delete data transaction');
      req.flash('alertStatus', 'danger');
    }
  },
};
