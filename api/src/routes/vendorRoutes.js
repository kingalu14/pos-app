const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendorController');
const authenticateToken = require('../middlewares/authenticateToken');
const verifyVendor = require('../middlewares/verifyVendor');
const checkVendorActive = require('../middlewares/checkVendorActive');
const checkPermission = require('../middlewares/authorization');

router.get('/vendors', authenticateToken, checkPermission('canViewVendors'), vendorController.getVendors);
router.post('/vendors', authenticateToken, checkPermission('canCreateVendor'), vendorController.createVendor);
router.get('/vendors/:vendorId', authenticateToken, checkPermission('canViewVendor'), verifyVendor, checkVendorActive, vendorController.getVendorById);
router.put('/vendors/:vendorId', authenticateToken, checkPermission('canUpdateVendor'), verifyVendor,checkVendorActive, vendorController.updateVendor);
router.delete('/vendors/:vendorId', authenticateToken, checkPermission('canDeleteVendor'), verifyVendor,checkVendorActive, vendorController.deleteVendor);

// Add this middleware to other routes as needed

module.exports = router;
