
const prisma = require('../config/prisma');
const checkSessionExpiry = async (req, res, next) => {
    if (!req.session || req.session.isExpired) {
        // Clear the cart associated with the session
        prisma.cart.deleteMany({
            where: {
                sessionId: req.sessionID,
                status: 'OPEN',
            },
        }).catch(error => {
            console.error('Error clearing cart on session expiry:', error);
        });
    }
    next();
};
module.exports = checkSessionExpiry;