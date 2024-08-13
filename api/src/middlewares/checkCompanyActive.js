const prisma = require('../config/prisma');
const checkVendorActive = async (req, res, next) => {
    try {
        const vendorId = req.body.vendorId || req.params.vendorId;
        const vendor = await prisma.vendor.findUnique({
            where: { id: vendorId },
        });

        if (!vendor || vendor.deletedAt) {
            return res.status(403).json({ message: 'vendor is deleted or does not exist' });
        }

        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = checkVendorActive;
