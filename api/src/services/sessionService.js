const prisma = require('../config/prisma');
const fetchCartSessionAndCheckExpiry = async (sessionId) => {
    try {
        // Fetch the session based on sessionId
        const session = await prisma.cart.findUnique({
            where: { sessionId },
        });

        // Check if the session exists
        if (!session) {
            throw new Error('Session not found');
        }

        // Compare expiresAt with the current time
        const currentTime = new Date();
        const isExpired = session.expiresAt <= currentTime;

        if (isExpired) {
            console.log('Session has expired');
            // Optionally, you can delete the expired session or perform cleanup
            await prisma.cart.delete({
                where: { sessionId },
            });
        } else {
            console.log('Session is still valid');
        }

        return { session, isExpired };
    } catch (error) {
        console.error('Error fetching session:', error);
        throw error;
    }
};


module.exports = fetchSessionAndCheckExpiry;