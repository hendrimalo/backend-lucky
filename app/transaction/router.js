const express = require('express');

const router = express.Router();

const { index, actionCreate } = require('./controller');
const { isLoginAdmin } = require('../middleware/auth');

router.use(isLoginAdmin);
router.get('/', index);
router.post('/', actionCreate);

module.exports = router;
