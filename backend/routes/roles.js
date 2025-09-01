const express = require('express');
const router = express.Router();
const {
  listRoles,
  createRole,
  updateRole,
  assignRole
} = require('../controllers/roleController');
const { authenticateToken, requireSuperadmin } = require('../middleware/auth');

router.use(authenticateToken, requireSuperadmin);

router.get('/', listRoles);
router.post('/', createRole);
router.put('/:id', updateRole);
router.post('/assign-role', assignRole);

module.exports = router;
