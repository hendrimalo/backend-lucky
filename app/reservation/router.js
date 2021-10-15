const express = require('express');

const router = express.Router();
const {
  index, actionCreate, actionDelete, actionStatus,
} = require('./controller');
const { isLoginAdmin } = require('../middleware/auth');

router.use(isLoginAdmin);
router.get('/', index);
router.post('/', actionCreate);
router.put('/status/:id', actionStatus);
router.delete('/:id', actionDelete);

module.exports = router;
