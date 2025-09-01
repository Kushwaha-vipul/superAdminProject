const express = require('express');
const router = express.Router();
const { getAuditLogs } = require('../controllers/auditController');

const { authenticateToken, requireSuperadmin } = require('../middleware/auth');

router.use(authenticateToken, requireSuperadmin);

router.get('/', getAuditLogs);

module.exports = router;
