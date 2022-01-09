const Service = require('./model');
const { alertError, alertSuccess } = require('../../utils/response');

module.exports = {
  index: async (req, res) => {
    try {
      const service = await Service.find();

      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };

      res.render('master/service/view-service', {
        alert,
        username: req.session.user.username,
        service,
      });
    } catch (error) {
      console.log(error);
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { name, desc, price } = req.body;
      // const formatter = new Intl.NumberFormat('en-US', {
      //   style: 'currency',
      //   currency: 'IDR',
      // });

      await Service.create({
        name,
        desc,
        price,
      });

      alertSuccess(req, 'create', 'service');

      res.redirect('/service');
    } catch (error) {
      alertError(req, 'create', 'service', error);

      res.redirect('/service');
    }
  },
  actionEdit: async (req, res) => {
    try {
      const {
        id, name, desc, price,
      } = req.body;
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'IDR',
      });

      await Service.findByIdAndUpdate(
        { _id: id },
        {
          name,
          desc,
          price: formatter.format(price),
        },
      );

      alertSuccess(req, 'edit', 'service');

      res.redirect('/service');
    } catch (error) {
      alertError(req, 'edit', 'service', error);

      res.redirect('/service');
    }
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;

      await Service.findOneAndRemove({ _id: id });

      alertSuccess(req, 'delete', 'service');

      res.redirect('/service');
    } catch (error) {
      alertError(req, 'delete', 'service', error);

      res.redirect('/service');
    }
  },
};
