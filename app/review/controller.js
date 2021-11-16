const Review = require('./model');

module.exports = {
  index: async (req, res) => {
    try {
      const review = await Review.find();

      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };

      res.render('master/review/view-review', {
        alert,
        username: req.session.user.username,
        review,
      });
    } catch (error) {
      console.log(error);
    }
  },
};
