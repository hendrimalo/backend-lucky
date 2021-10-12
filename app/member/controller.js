const Member = require('./model');

module.exports = {
  index: async (req, res) => {
    try {
      const member = await Member.find();

      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };

      res.render('master/member/view-member', {
        alert,
        member,
      });
    } catch (error) {
      console.log(error);
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { username, password, role } = req.body;

      const member = await Member({ username, password, role });
      await member.save();

      req.flash('alertMessage', 'Success create new member');
      req.flash('alertStatus', 'success');

      res.redirect('/member');
    } catch (error) {
      req.flash('alertMessage', 'Failed create new member');
      req.flash('alertStatus', 'danger');

      res.redirect('/member');
    }
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;

      await Member.findOneAndDelete({ _id: id });

      req.flash('alertMessage', 'Success delete data member');
      req.flash('alertStatus', 'success');

      res.redirect('/member');
    } catch (error) {
      req.flash('alertMessage', 'Failed delete data member');
      req.flash('alertStatus', 'danger');

      res.redirect('/member');
    }
  },
};
