const express = require('express');

const router = express.Router();
const { index, actionSignin, actionSignout } = require('../controllers/home');

router.get('/', index);
router.post('/', actionSignin);
router.get('/logout', actionSignout);

module.exports = router;
