const express = require('express');

const router = express.Router();
const {
  home, signup, signin, postReservation, postReview, getReservation, getService,
  getReview, getUserTransaction, getDetailUserTransaction,
} = require('./controller');

const { isLoginAPI } = require('../middleware/auth');

router.get('/home', home);

// reservation
router.get('/reservation', getReservation);
router.post('/user/reservation', isLoginAPI, postReservation);

// service
router.get('/service', getService);

// review
router.get('/review', getReview);
router.post('/user/review', isLoginAPI, postReview);

// auth
router.post('/signin', signin);
router.post('/signup', signup);

// transaction
router.get('/user/transaction', getUserTransaction);
router.get('/user/transaction/:id', isLoginAPI, getDetailUserTransaction);

module.exports = router;
