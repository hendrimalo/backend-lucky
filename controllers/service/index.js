const { Service } = require('../../models');
const { alertError, alertSuccess } = require('../../utils/response');
const { limit } = require('../../config/params');

module.exports = {
  index: async (req, res) => {
    try {
      const { page } = req.query;
      const offside = (page - 1) * limit;

      const service = await Service.find().limit(limit).skip(offside);

      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };

      res.render('master/service/view-service', {
        alert,
        username: req.session.user.username,
        role: req.session.user.role,
        service,
      });
    } catch (error) {
      console.log(error);
    }
  },
  actionCreate: async (req, res) => {
    try {
      const {
        name, desc, price, status,
      } = req.body;

      await Service.create({
        name,
        desc,
        price,
        status,
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
        id, name, desc, price, status,
      } = req.body;

      await Service.findByIdAndUpdate(
        { _id: id },
        {
          name,
          desc,
          price,
          status,
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
