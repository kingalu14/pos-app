const { processStripePayment, processCashPayment } = require('../utils/paymentHandler');

const paymentService = async (paymentMethod) => {
    if (paymentMethod === 'card') {
        return processStripePayment(amount, currency, paymentToken, description);
    }else if (paymentMethod === 'cash') {
        return processCashPayment(amount, currency)
            throw new Error('Unsupported payment method');
    }
    else {
        throw new Error('Unsupported payment method');
    }

}
module.exports = {
    paymentService,
};