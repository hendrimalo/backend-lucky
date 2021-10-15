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
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'IDR',
      });

      await Service.create({
        name,
        desc,
        price: formatter.format(price),
      });

      req.flash('alertMessage', 'Success create new service');
      req.flash('alertStatus', 'success');

      res.redirect('/service');
    } catch (error) {
      req.flash('alertMessage', `Failed create new service ${error}`);
      req.flash('alertStatus', 'danger');

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

      req.flash('alertMessage', 'Success edit new service');
      req.flash('alertStatus', 'success');

      res.redirect('/service');
    } catch (error) {
      req.flash('alertMessage', `Failed edit data service ${error}`);
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
      req.flash('alertMessage', `Failed delete data service ${error}`);
      req.flash('alertStatus', 'danger');

      res.redirect('/service');
    }
  },
};
