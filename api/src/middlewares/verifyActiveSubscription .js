const subscriptionService = require('../services/subscriptionService');

const verifyActiveSubscription = async (req, res, next) => {
    try {
        const vendorId= req.body.vendorId|| req.params.vendorId;
        const subscription = await subscriptionService.getActiveSubscriptionByVendorId(vendorId);
        if (!subscription) {
            return res.status(403).json({ message: 'No active subscription found for this vendor' });
        }
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = verifyActiveSubscription;
