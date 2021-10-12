const express = require('express');

const router = express.Router();

const {
  home, signup, signin, booking,
} = require('./controller');
const { isLoginAPI } = require('../middleware/auth');

router.get('/home', home);
router.post('/signin', signin);
router.post('/signup', signup);
router.post('/booking', isLoginAPI, booking);

module.exports = router;
