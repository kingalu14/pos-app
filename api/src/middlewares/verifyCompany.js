const prisma = require('../config/prisma');

const verifyCompany = async (req, res, next) => {
    const userId = req.user.id; 
    const companyId = req.body.companyId || req.params.companyId;

    const userCompany = await prisma.userCompany.findFirst({
        where: { userId, companyId }
    });

    if (!userCompany) {
        return res.status(403).json({ message: 'User does not belong to the specified company' });
    }

    next();
};

module.exports = verifyCompany;
