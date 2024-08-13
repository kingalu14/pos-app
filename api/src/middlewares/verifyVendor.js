const prisma = require('../config/prisma');
const verifyVendor = async (req, res, next) => {
    const userId = req.user.id; 
    const vendorId = req.body.vendorId || req.params.vendorId;
    const userVendor = await prisma.userVendor.findFirst({
        where: { userId, vendorId }
    });
    if (!userVendor) {
        return res.status(403).json({ message: 'User does not belong to the specified Vendor' });
    }
    next();
};
module.exports = verifyVendor;
