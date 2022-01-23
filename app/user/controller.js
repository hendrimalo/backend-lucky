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
        role: req.session.user.role,
        user,
      });
    } catch (error) {
      console.log(error);
    }
  },
};
