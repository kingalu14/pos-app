const prisma = require('../config/prisma');

class InvoicesRepository {


    async createinvoice(data, userId, transaction) {
        // Create the company
        const company = await transaction.company.create({
            data: {
                ...data,
                deletedAt:null,
            }
        });

        // Associate the user with the created company
        await transaction.userCompany.create({
            data: {
                userId,
                companyId: company.id,
                role: 'admin', // Assign a default role
                permissions: ['all'], // Assign default permissions
                deletedAt: null        //set deletedAt to null
            },
        });

        return company;
    }
    
    async findById(id) {
        return await prisma.company.findUnique({ where: { id: id, deletedAt: null } });
    }

    async findCompaniesByUserId(userId) {
        const userCompanies = await prisma.userCompany.findMany({
            where: {
                userId,
            },
            include: {
                Company: true,
            },
        });
        console.log(userCompanies);
        return userCompanies.map(uc => uc.Company);
    }

    async findAll() {
        return await prisma.company.findMany();
    }

    async findActiveByUserId(userId) {
        const userCompanies = await prisma.userCompany.findMany({
            where: { userId },
            include: { Company: true }
        });

        return userCompanies
            .filter(uc => !uc.Company.deletedAt)
            .map(uc => uc.Company);
    }
}

module.exports = new CompanyRepository();
