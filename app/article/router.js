const express = require('express');

const router = express.Router();
const { index, actionCreate, actionDelete } = require('./contoller');
const { uploadMultiple } = require('../middleware/multer');

const { isLoginAdmin } = require('../middleware/auth');

router.use(isLoginAdmin);
router.get('/', index);
router.post('/', uploadMultiple, actionCreate);
router.delete('/:id', actionDelete);

module.exports = router;
