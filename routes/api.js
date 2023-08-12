const express = require('express');

const router = express.Router();
const {
  home, signup, signin, postReservation, postReview, getReservation, getService,
  getReview, getUserTransaction, getDetailUserTransaction,
} = require('../controllers/api');

const { isLoginAPI } = require('../middleware/auth');

// auth
router.post('/signin', signin);
router.post('/signup', signup);

router.get('/home', home);

// reservation
router.get('/reservation', getReservation);
router.post('/reservation', isLoginAPI, postReservation);

// service
router.get('/service', getService);

// review
router.get('/review', getReview);
router.post('/review', isLoginAPI, postReview);

// transaction
router.get('/transaction', isLoginAPI, getUserTransaction);
router.get('/transaction/:id', isLoginAPI, getDetailUserTransaction);

module.exports = router;
