const jwt = require('jsonwebtoken');
const config = require('../../config');
const User = require('../user/model');

module.exports = {
  isLoginAdmin: (req, res, next) => {
    if (req.session.user === null || req.session.user === undefined) {
      req.flash('alertMessage', 'Access Denied');
      req.flash('alertStatus', 'danger');

      res.redirect('/');
    } else {
      next();
    }
  },
  isLoginMaster: (req, res, next) => {
    if (req.session.user === null || req.session.user === undefined || req.session.user.role === 'Admin') {
      req.flash('alertMessage', 'Access Denied');
      req.flash('alertStatus', 'danger');

      res.redirect('/');
    } else {
      next();
    }
  },
  isLoginAPI: async (req, res, next) => {
    try {
      const token = req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : null;
      const data = jwt.verify(token, config.jwtKey);
      const user = await User.findOne({ _id: data.user.id });

      if (!user) {
        throw new Error();
      }

      req.user = user;
      req.token = token;

      next();
    } catch (error) {
      res.status(401).json({
        error: 'Not authorized to acces this resource',
      });
    }
  },
};
