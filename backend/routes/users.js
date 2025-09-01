const express = require('express');
const router = express.Router();
const { listUsers, getUser, createUser, updateUser, deleteUser } = require('../controllers/userController');
const { authenticateToken } = require('../middleware/auth');
const requireSuperadmin = require('../middleware/requireSuperadmin');

router.use(authenticateToken, requireSuperadmin);

router.get('/', listUsers);
router.get('/:id', getUser);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
