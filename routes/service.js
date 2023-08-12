const express = require('express');

const router = express.Router();

const {
  index, actionCreate, actionDelete, actionEdit,
} = require('../controllers/service');
const { isLoginAdmin } = require('../middleware/auth');

router.use(isLoginAdmin);
router.get('/', index);
router.post('/', actionCreate);
router.put('/', actionEdit);
router.delete('/:id', actionDelete);

module.exports = router;
