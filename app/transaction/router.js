const express = require('express');

const router = express.Router();

const { index, actionCreate, detail } = require('./controller');
const { isLoginAdmin } = require('../middleware/auth');

router.use(isLoginAdmin);
router.get('/', index);
router.get('/:id', detail);
router.post('/', actionCreate);

module.exports = router;
