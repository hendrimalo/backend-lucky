const Member = require('./model');
const { alertError, alertSuccess } = require('../../utils/response');

module.exports = {
  index: async (req, res) => {
    try {
      const member = await Member.find();

      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };

      res.render('master/member/view-member', {
        alert,
        username: req.session.user.username,
        role: req.session.user.role,
        member,
      });
    } catch (error) {
      console.log(error);
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { username, password, role } = req.body;

      await Member.create({ username, password, role });

      alertSuccess(req, 'create', 'member');

      res.redirect('/member');
    } catch (error) {
      alertError(req, 'create', 'member', error);

      res.redirect('/member');
    }
  },
  actionEdit: async (req, res) => {
    try {
      const {
        id, username, password, role, status,
      } = req.body;

      await Member.findByIdAndUpdate(
        { _id: id }, {
          username,
          password,
          role,
          status,
        },
      );

      alertSuccess(req, 'edit', 'member');

      res.redirect('/member');
    } catch (error) {
      alertError(req, 'edit', 'member', error);

      res.redirect('/member');
    }
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;

      await Member.findOneAndDelete({ _id: id });

      alertSuccess(req, 'delete', 'member');

      res.redirect('/member');
    } catch (error) {
      alertError(req, 'delete', 'member', error);

      res.redirect('/member');
    }
  },
};
