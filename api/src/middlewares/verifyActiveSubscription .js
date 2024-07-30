const subscriptionService = require('../services/subscriptionService');

const verifyActiveSubscription = async (req, res, next) => {
    try {
        const companyId = req.body.companyId || req.params.companyId;
        const subscription = await subscriptionService.getActiveSubscriptionByCompanyId(companyId);
        if (!subscription) {
            return res.status(403).json({ message: 'No active subscription found for this company' });
        }
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = verifyActiveSubscription;
