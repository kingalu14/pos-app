const subscriptionService = require('../services/subscriptionService');

const createSubscription = async (req, res) => {
    try {
        const { companyId, packageId, paymentToken } = req.body;
        const subscription = await subscriptionService.createSubscription(companyId,packageId);
        res.status(201).json(subscription);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getSubscriptionsByCompanyId = async (req, res) => {
    try {
        const subscriptions = await subscriptionService.getSubscriptionsByCompanyId(req.params.companyId);
        res.status(200).json(subscriptions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getActiveSubscriptionByCompanyId = async (req, res) => {
    try {
        const subscription = await subscriptionService.getActiveSubscriptionByCompanyId(req.params.companyId);
        res.status(200).json(subscription);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createSubscription,
    getSubscriptionsByCompanyId,
    getActiveSubscriptionByCompanyId
};
