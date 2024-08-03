const express = require('express');
const router = express.Router();
const {
    getUserById,
    getUsers,
} = require('../controllers/userController');

const authenticateToken = require('../middlewares/authenticateToken');
const checkPermission = require('../middlewares/authorization');

// router.post('/:id', authenticateToken, checkPermission('canViewUser'), getUserById);
// router.post('/', authenticateToken, checkPermission('canViewUsers'), getUsers);


router.get('/:id', authenticateToken, getUserById);
router.get('/', authenticateToken, getUsers);

module.exports = router;
