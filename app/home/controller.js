const bcrypt = require('bcryptjs');
const Member = require('../member/model');

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };

      res.render('home/view-home', {
        alert,
      });
    } catch (error) {
      console.log(error);
    }
  },
  actionSignin: async (req, res) => {
    try {
      const { username, password } = req.body;

      const check = await Member.findOne({ username });

      if (check) {
        const validation = bcrypt.compareSync(password, check.password);
        if (validation) {
          req.session.user = {
            id: check._id,
            username: check.username,
            status: check.status,
          };

          res.redirect('/dashboard');
        } else {
          req.flash('alertMessage', 'Data member not found');
          req.flash('alertStatus', 'danger');

          res.redirect('/');
        }
      } else {
        req.flash('alertMessage', 'Data member not found');
        req.flash('alertStatus', 'danger');

        res.redirect('/');
      }
    } catch (error) {
      req.flash('alertMessage', `Data member not found ${error}`);
      req.flash('alertStatus', 'danger');

      res.redirect('/');
    }
  },
  actionSignout: (req, res) => {
    req.session.destroy();

    res.redirect('/');
  },
};
