const User = require('./model');

module.exports = {
  index: async (req, res) => {
    try {
      const user = await User.find();

      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };

      res.render('master/user/view-user', {
        alert,
        username: req.session.user.username,
        user,
      });
    } catch (error) {
      console.log(error);
    }
  },
  actionCreate: async (req, res) => {
    try {
      const {
        username, password, phoneNumber, email,
      } = req.body;

      const user = await User({
        username, password, phoneNumber, email,
      });
      await user.save();

      req.flash('alertMessage', 'Success create new user');
      req.flash('alertStatus', 'success');

      res.redirect('/user');
    } catch (error) {
      req.flash('alertMessage', `Failed create new user ${error}`);
      req.flash('alertStatus', 'danger');

      res.redirect('/user');
    }
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;

      await User.findOneAndDelete({ _id: id });

      req.flash('alertMessage', 'Success delete data user');
      req.flash('alertStatus', 'success');

      res.redirect('/user');
    } catch (error) {
      req.flash('alertMessage', `Failed delete data user ${error}`);
      req.flash('alertStatus', 'danger');

      res.redirect('/user');
    }
  },
};
