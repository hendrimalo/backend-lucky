const express = require('express');

const router = express.Router();
const {
  index, actionCreate, actionDelete, detail, actionEdit,
} = require('../controllers/article');
const { uploadMultiple } = require('../middleware/multer');

const { isLoginAdmin } = require('../middleware/auth');

router.use(isLoginAdmin);
router.get('/', index);
router.get('/:id', detail);
router.put('/:id', actionEdit);
router.post('/', uploadMultiple, actionCreate);
router.delete('/:id', actionDelete);

module.exports = router;
