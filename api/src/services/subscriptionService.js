const prisma = require('../config/prisma');
const { processStripePayment } = require('../utils/paymentHandler');

const createSubscription = async (companyId, packageId, paymentToken=null) => {

    try {
        const package = await prisma.package.findUnique({
            where: { id: packageId }
        });

        if (!package) {
            throw new Error('Package not found');
        }
        // Process payment using the payment handler
        //await processStripePayment(packageDetails.price, packageDetails.currencyType, paymentToken,
        //    `Subscription payment for package ${packageDetails.name}`);

        const endDate = new Date();
        endDate.setDate(endDate.getDate() + package.duration);

        return await prisma.subscription.create({
            data: {
                companyId,
                packageId,
                endDate
            }
        });

    } catch (error) {
        console.error('Error creating subscription:', error.message);
        throw error;
    }
};

const getSubscriptionsByCompanyId = async (companyId) => {
    return await prisma.subscription.findMany({
        where: { companyId }
    });
};

const getActiveSubscriptionByCompanyId = async (companyId) => {
    const now = new Date();
    return await prisma.subscription.findFirst({
        where: {
            companyId,
            startDate: { lte: now },
            endDate: { gte: now }
        }
    });
};

module.exports = {
    createSubscription,
    getSubscriptionsByCompanyId,
    getActiveSubscriptionByCompanyId
};
