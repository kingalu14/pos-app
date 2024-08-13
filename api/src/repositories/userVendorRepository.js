const prisma = require('../config/prisma');

class UserVendorRepository {
    async create(data, transaction) {
        return transaction.userVendor.create({
            data,
        });
    }

    async findMany(query) {
        return prisma.userVendor.findMany(query);
    }

    async findFirst(userId, vendorId) {
        return await prisma.userVendor.findFirst({
            where: { userId, vendorId}
        })
    }

    async findVendorByUserAndVendorId(userId, vendorId) {
        return prisma.userVendor.findFirst({
            where: { userId,vendorId },
            include: {
                Vendor: {
                    where: { deletedAt: null }, // Ensure Vendor is not soft-deleted
                },
            },
        });
    }
}

module.exports = new UserVendorRepository();