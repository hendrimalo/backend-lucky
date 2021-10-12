const express = require('express');

const router = express.Router();
const { index, actionSignin } = require('./controller');

router.get('/', index);
router.post('/', actionSignin);

module.exports = router;
