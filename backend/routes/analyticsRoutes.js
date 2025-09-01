const express = require('express');
const router = express.Router();
const { getSummary } = require('../controllers/analyticsController');
const { authenticateToken, requireSuperadmin } = require('../middleware/auth');

router.use(authenticateToken, requireSuperadmin);

router.get('/', getSummary);

module.exports = router;
