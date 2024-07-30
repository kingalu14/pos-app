const prisma = require('../config/prisma');

class UserCompanyRepository {
    async create(data, transaction) {
        return transaction.userCompany.create({
            data,
        });
    }

    async findMany(query) {
        return prisma.userCompany.findMany(query);
    }

    async findFirst(userId, companyId) {
        return await prisma.userCompany.findFirst({
            where: { userId, companyId}
        })
    }

    async findCompanyByUserAndCompanyId(userId, companyId) {
        return prisma.userCompany.findFirst({
            where: { userId,companyId },
            include: {
                Company: {
                    where: { deletedAt: null }, // Ensure company is not soft-deleted
                },
            },
        });
    }
}

module.exports = new UserCompanyRepository();