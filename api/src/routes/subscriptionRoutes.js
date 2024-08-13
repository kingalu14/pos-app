const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');
const authenticateToken = require('../middlewares/authenticateToken');
const checkPermission = require('../middlewares/authorization');

router.post('/subscriptions', authenticateToken, checkPermission('canManageSubscriptions'), subscriptionController.createSubscription);
router.get('/subscriptions/:vendorId', authenticateToken, checkPermission('canViewSubscriptions'), subscriptionController.getSubscriptionsByVendorId);
router.get('/subscriptions/active/:vendorId', authenticateToken, checkPermission('canViewSubscriptions'), subscriptionController.getActiveSubscriptionByVendorId);

module.exports = router;
