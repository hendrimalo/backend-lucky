const express = require('express');

const router = express.Router();

const {
  home, signup, signin, reservation, review, getReservation, getService, getReview,
} = require('./controller');
const { isLoginAPI } = require('../middleware/auth');

router.get('/home', home);
router.get('/reservation', getReservation);
router.get('/service', getService);
router.get('/review', getReview);
router.post('/signin', signin);
router.post('/signup', signup);
router.post('/user/reservation', isLoginAPI, reservation);
router.post('/user/review', isLoginAPI, review);

module.exports = router;
