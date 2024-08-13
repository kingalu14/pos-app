const subscriptionService = require('../services/subscriptionService');

const createSubscription = async (req, res) => {
    try {
        const { vendorId, packageId, paymentToken } = req.body;
        const subscription = await subscriptionService.createSubscription(vendorId,packageId);
        res.status(201).json(subscription);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getSubscriptionsByVendorId = async (req, res) => {
    try {
        const subscriptions = await subscriptionService.getSubscriptionsByVendorId(req.params.vendorId);
        res.status(200).json(subscriptions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getActiveSubscriptionByVendorId = async (req, res) => {
    try {
        const subscription = await subscriptionService.getActiveSubscriptionByVendorId(req.params.vendorId);
        res.status(200).json(subscription);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createSubscription,
    getSubscriptionsByVendorId,
    getActiveSubscriptionByVendorId};
