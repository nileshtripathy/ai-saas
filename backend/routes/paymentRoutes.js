const express = require('express');
const router = express.Router();

const {
    createSubscription,
    verifyPayment
} = require('../controllers/paymentController');

router.post('/create-subscription', createSubscription);
router.post('/verify', verifyPayment);

module.exports = router;