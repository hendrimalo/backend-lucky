const express = require('express');

const router = express.Router();

const {
  home, signup, signin, postReservation, postReview, getReservation, getService, getReview,
  getUserTransaction,
} = require('./controller');
const { isLoginAPI } = require('../middleware/auth');

router.get('/home', home);
router.get('/reservation', getReservation);
router.get('/service', getService);
router.get('/review', getReview);
router.post('/signin', signin);
router.post('/signup', signup);
router.post('/user/reservation', isLoginAPI, postReservation);
router.post('/user/review', isLoginAPI, postReview);
router.get('/user/transaction', getUserTransaction);

module.exports = router;
