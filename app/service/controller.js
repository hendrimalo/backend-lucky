const Service = require('./model');

module.exports = {
  index: async (req, res) => {
    try {
      const service = await Service.find();

      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };

      res.render('master/service/view-service', {
        alert,
        service,
      });
    } catch (error) {
      console.log(error);
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { name, desc, price } = req.body;

      const service = await Service({ name, desc, price });
      await service.save();

      req.flash('alertMessage', 'Success create new service');
      req.flash('alertStatus', 'success');

      res.redirect('/service');
    } catch (error) {
      req.flash('alertMessage', 'Failed create new service');
      req.flash('alertStatus', 'danger');

      res.redirect('/service');
    }
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;

      await Service.findOneAndRemove({ _id: id });

      req.flash('alertMessage', 'Success delete data service');
      req.flash('alertStatus', 'success');

      res.redirect('/service');
    } catch (error) {
      req.flash('alertMessage', 'Failed delete data service');
      req.flash('alertStatus', 'danger');

      res.redirect('/service');
    }
  },
};
