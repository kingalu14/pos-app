const prisma = require('../config/prisma');

class VendorRepository {

    async createVendorAndUserVendor(data, userId, transaction) {
        // Create the Vendor      
          const vendor = await transaction.vendor.create({
            data: {
                ...data,
                deletedAt:null,
            }
        });

        // Associate the user with the created Vendor   
           await transaction.userVendor.create({
            data: {
                userId,
                vendorId: vendor.id,
                role: 'admin', // Assign a default role
                permissions: ['all'], // Assign default permissions
                deletedAt: null        //set deletedAt to null
            },
        });
        return vendor;
    }
    
    async findById(id) {
        return await prisma.vendor.findUnique({ where: { id: id, deletedAt: null } });
    }

    async findVendorsByUserId(userId) {
        const userVendors = await prisma.userVendor.findMany({
            where: {
                userId,
            },
            include: {
                Vendor: true,
            },
        });
        console.log(userVendors);
        return userVendors.map(uc => uc.Vendor);
    }

    async findAll() {
        return await prisma.vendor.findMany();
    }

    async update(id, data) {
        return await prisma.vendor.update({ where: { id }, data });
    }

    async softDeleteVendor(vendorId, transaction) {
        return transaction.vendor.update({
            where: { id: vendorId },
            data: { deletedAt: new Date() },
        });
    }

    async findActiveByUserId(userId) {
        const userVendors = await prisma.userVendor.findMany({
            where: { userId },
            include: { Vendor: true }
        });

        return userVendors
            .filter(uc => !uc.Vendor.deletedAt)
            .map(uc => uc.Vendor);
    }
}

module.exports = new VendorRepository();
