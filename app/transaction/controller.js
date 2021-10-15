const Transaction = require('./model');
const Member = require('../member/model');
const Product = require('../service/model');
const History = require('../history service/model');

module.exports = {
  index: async (req, res) => {
    try {
      const transaction = await Transaction.find().sort({ date: -1 })
        .populate('productId');
      const member = await Member.find();
      const product = await Product.find().select('name price');

      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };

      res.render('master/transaction/view-transaction', {
        alert,
        username: req.session.user.username,
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
      const { member, payment, productId } = req.body;

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
      req.flash('alertMessage', `Failed delete data transaction ${error}`);
      req.flash('alertStatus', 'danger');
    }
  },
};
