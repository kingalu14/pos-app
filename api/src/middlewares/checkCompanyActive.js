const prisma = require('../config/prisma');
const checkCompanyActive = async (req, res, next) => {
    try {
        const companyId = req.body.companyId || req.params.companyId;
        const company = await prisma.company.findUnique({
            where: { id: companyId },
        });

        if (!company || company.deletedAt) {
            return res.status(403).json({ message: 'Company is deleted or does not exist' });
        }

        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = checkCompanyActive;
