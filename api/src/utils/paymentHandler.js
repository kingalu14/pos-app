//const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { PAYMENT_STATUS } = require('../constants/index');

const processStripePayment = async (amount, currency, paymentToken, description) => {
    // try {
    //     const charge = await stripe.charges.create({
    //         amount: amount * 100, // Stripe expects the amount in cents
    //         currency,
    //         source: paymentToken,
    //         description,
    //     });

    //     if (!charge || charge.status !== 'succeeded') {
    //         throw new Error('Payment failed');
    //     }

    //     return charge;
    // } catch (error) {
    //     console.error('Error processing payment:', error.message);
    //     throw error;
    // }

    return {
        status: PAYMENT_STATUS.SUCCEEDED,
        amount,
        currency,
        paymentMethod: 'card',
        description: 'Card payment processed',
    };
};

const processCashPayment = async (amount, currency) => {
    // Implement logic for processing cash payment
    // This could involve simply recording the cash payment in the system
    return {
        status: PAYMENT_STATUS.SUCCEEDED,
        amount,
        currency,
        paymentMethod: 'cash',
        description: 'Cash payment processed',
    };
};

module.exports = {
    processStripePayment,
    processCashPayment
};