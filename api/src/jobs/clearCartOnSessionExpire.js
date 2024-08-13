const cron = require('node-cron');
const prisma = require('../config/prisma');

// Define the job to run periodically
cron.schedule('0 0 * * *', async () => {
    try {
        // Find and delete carts associated with expired sessions
        const expiredCarts = await prisma.cart.findMany({
            where: {
                status: 'OPEN',
            },
        });

        const cartIds = expiredCarts.map(cart => cart.id);

        if (cartIds.length > 0) {
            await prisma.cart.deleteMany({
                where: {
                    id: { in: cartIds },
                },
            });

            console.log(`${cartIds.length} expired carts cleared.`);
        }
    } catch (error) {
        console.error('Error clearing expired carts:', error);
    }
});
