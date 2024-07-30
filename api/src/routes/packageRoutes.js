const express = require('express');
const router = express.Router();
const packageController = require('../controllers/packageController');
const authenticateToken = require('../middlewares/authenticateToken');
const checkPermission = require('../middlewares/authorization');

router.post('/', authenticateToken, checkPermission('canAddPackage'), packageController.createPackage);
router.get('/', authenticateToken, checkPermission('canViewPackages'), packageController.getPackages);
router.get('/:id', authenticateToken, checkPermission('canViewPackage'), packageController.getPackageById);
router.put('/:id', authenticateToken, checkPermission('canEditPackage'), packageController.updatePackage);
router.delete('/:id', authenticateToken, checkPermission('canDeletePackage'), packageController.deletePackage);

module.exports = router;
