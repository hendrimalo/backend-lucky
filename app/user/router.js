const express = require('express');

const router = express.Router();

const { index } = require('./controller');
const { isLoginMaster } = require('../middleware/auth');

router.use(isLoginMaster);
router.get('/', index);

module.exports = router;
