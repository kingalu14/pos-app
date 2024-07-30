const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');
const authenticateToken = require('../middlewares/authenticateToken');
const checkPermission = require('../middlewares/authorization');

router.post('/subscriptions', authenticateToken, checkPermission('canManageSubscriptions'), subscriptionController.createSubscription);
router.get('/subscriptions/:companyId', authenticateToken, checkPermission('canViewSubscriptions'), subscriptionController.getSubscriptionsByCompanyId);
router.get('/subscriptions/active/:companyId', authenticateToken, checkPermission('canViewSubscriptions'), subscriptionController.getActiveSubscriptionByCompanyId);

module.exports = router;
