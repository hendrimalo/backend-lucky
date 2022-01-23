const Review = require('./model');

module.exports = {
  index: async (req, res) => {
    try {
      const review = await Review.find()
        .populate('transactionId', 'member');

      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };

      res.render('master/review/view-review', {
        alert,
        username: req.session.user.username,
        role: req.session.user.role,
        review,
      });
    } catch (error) {
      console.log(error);
    }
  },
  detail: async (req, res) => {
    try {
      const { id } = req.params;

      const review = await Review.findById({ _id: id })
        .populate('transactionId', 'member');

      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };

      res.render('master/review/view-detail', {
        alert,
        username: req.session.user.username,
        role: req.session.user.role,
        review,
      });
      console.log(review);
    } catch (error) {
      console.log(error);
    }
  },
};
