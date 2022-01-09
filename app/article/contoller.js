const fs = require('fs-extra');
const path = require('path');

const Article = require('./model');
const Image = require('../image/model');
const { alertError, alertSuccess } = require('../../utils/response');

module.exports = {
  index: async (req, res) => {
    try {
      const article = await Article.find()
        .populate('imageId');

      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };

      res.render('master/article/view-article', {
        alert,
        username: req.session.user.username,
        article,
      });
    } catch (error) {
      console.log(error);
    }
  },
  detail: async (req, res) => {
    try {
      const { id } = req.params;
      const article = await Article.findById({ _id: id }).populate('imageId');

      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };

      res.render('master/article/view-edit', {
        alert,
        username: req.session.user.username,
        article,
      });
    } catch (error) {
      alertError(req, 'detail', 'article', error);

      res.redirect('/article');
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { title, desc } = req.body;

      const article = await Article.create({ title, desc });

      for (let i = 0; i < req.files.length; i++) {
        const image = await Image.create({ image: `images/${req.files[i].filename}` });
        article.imageId.push({ _id: image._id });

        await article.save();
      }

      alertSuccess(req, 'create', 'article');

      res.redirect('/article');
    } catch (error) {
      alertError(req, 'create', 'article', error);

      res.redirect('/article');
    }
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;

      const article = await Article.findOne({ _id: id }).populate('imageId');

      for (let i = 0; i < article.imageId.length; i++) {
        Image.findOne({ _id: article.imageId[i]._id }).then((image) => {
          fs.unlink(path.join(`public/${image.image}`));
          image.remove();
        }).catch((error) => {
          alertError(req, 'delete', 'article', error);

          res.redirect('/article');
        });
      }
      await article.remove();

      alertSuccess(req, 'delete', 'article');

      res.redirect('/article');
    } catch (error) {
      alertError(req, 'delete', 'article', error);

      res.redirect('/article');
    }
  },
  actionDeletePhoto: async (req, res) => {
    try {
      const { id } = req.params;
      const article = await Article.findById({ _id: id }).populate('imageId');

      await Image.findById({ _id: article.imageId[0]._id }).then((image) => {
        fs.unlink(path.join(`public/${image.image}`));
        image.remove();
      }).catch((error) => {
        alertError(req, 'delete', 'image article', error);

        res.redirect('/article/:id');
      });
    } catch (error) {
      alertError(req, 'delete', 'article', error);

      res.redirect('/article/:id');
    }
  },
  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, desc } = req.body;

      await Article.findByIdAndUpdate({ _id: id }, { title, desc });

      alertSuccess(req, 'edit', 'article');

      res.redirect('/article');
    } catch (error) {
      alertError(req, 'edit', 'article', error);

      res.redirect('/article');
    }
  },
};
