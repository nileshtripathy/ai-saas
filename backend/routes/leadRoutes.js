const express = require('express');
const router = express.Router();

const { createLead, getLeads } = require('../controllers/leadController');
const auth = require('../middleware/auth');

router.post('/', auth, createLead);
router.get('/', auth, getLeads);

module.exports = router;