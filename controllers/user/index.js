const { User } = require('../../models');
const { limit } = require('../../config/params');

module.exports = {
  index: async (req, res) => {
    try {
      const { page } = req.query;
      const offside = (page - 1) * limit;

      const user = await User.find().limit(limit).skip(offside);

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
