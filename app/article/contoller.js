const fs = require('fs-extra');
const path = require('path');

const Article = require('./model');
const Image = require('../image/model');

module.exports = {
  index: async (req, res) => {
    try {
      const article = await Article.find();

      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };

      res.render('master/article/view-article', {
        alert,
        article,
      });
    } catch (error) {
      console.log(error);
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

      req.flash('alertMessage', 'Success create new article');
      req.flash('alertStatus', 'success');

      res.redirect('/article');
    } catch (error) {
      console.log(error);
      req.flash('alertMessage', `Failed create new article ${error}`);
      req.flash('alertStatus', 'danger');

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
          res.redirect('/article');
        });
      }
      await article.remove();

      req.flash('alertMessage', 'Success delete data article');
      req.flash('alertStatus', 'success');

      res.redirect('/article');
    } catch (error) {
      req.flash('alertMessage', 'Failed delete new article');
      req.flash('alertStatus', 'danger');

      res.redirect('/article');
    }
  },
};
