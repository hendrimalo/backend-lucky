const express = require('express');

const router = express.Router();
const { index, detail } = require('../controllers/review');
const { isLoginMaster } = require('../middleware/auth');

router.use(isLoginMaster);
router.get('/', index);
router.get('/:id', detail);

module.exports = router;
