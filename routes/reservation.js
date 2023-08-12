const express = require('express');

const router = express.Router();
const {
  index, actionCreate, actionStatus, actionConfirmReservation,
} = require('../controllers/reservation');
const { isLoginAdmin } = require('../middleware/auth');

router.use(isLoginAdmin);
router.get('/', index);
router.post('/', actionCreate);
router.post('/confirm', actionConfirmReservation);
router.put('/status/:id', actionStatus);

module.exports = router;
