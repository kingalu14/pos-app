const prisma = require('../config/prisma');

class PackagesRepository {

    async create(data) {
        return await prisma.package.create({
            data: {
                name: data.name,
                price: data.price,
                duration: data.duration,
                currencyType: data.currencyType,
                deletedAt: null   
            },
        });
    }
    async findFirst(packageId) {
        return await prisma.package.findFirst({
            where: { id: packageId, deletedAt: null }
        })
    }

    async findAll() {
        return await prisma.package.findMany({
            where: { deletedAt: null }
        });
    }

    async update(id, data) {
        return await prisma.package.update({ where: { id }, data });
    }

    async softDeletePackage(id) {
        return prisma.package.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
    }
}

module.exports = new PackagesRepository();