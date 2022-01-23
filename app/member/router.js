const express = require('express');

const router = express.Router();

const {
  index, actionCreate, actionDelete, actionEdit,
} = require('./controller');
const { isLoginMaster } = require('../middleware/auth');

router.use(isLoginMaster);
router.get('/', index);
router.post('/', actionCreate);
router.put('/', actionEdit);
router.delete('/:id', actionDelete);

module.exports = router;
