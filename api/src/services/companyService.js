const prisma = require('../config/prisma');
const companyRepository = require('../repositories/companyRepository');
const userCompanyRepository = require('../repositories/userCompanyRepository');

const createCompany =  async (data, userId) => {
    return await prisma.$transaction(async (transaction) => {
        return companyRepository.createCompanyAndUserCompany(data, userId,transaction);
    });
}

const getCompanyById = async (companyId, userId) => {
    const company = await companyRepository.findById(companyId);
    if (!company) {
        return res.status(404).json({ message: 'Company not found' });
    }

    const userCompany = await userCompanyRepository.findCompanyByUserAndCompanyId(userId, companyId);

    if (!userCompany) {
        throw new Error('User does not belong to this company');
    }
    return company;
};

const getCompanies = async (userId) => {
    const activeCompanies = await companyRepository.findCompaniesByUserId(userId);
    console.log(activeCompanies);
    return activeCompanies;
};

const updateCompany = async (companyId, data, userId) => {
    const userCompany = await userCompanyRepository.findFirst(userId,companyId);
    if (!userCompany) {
        throw new Error('User does not belong to this company');
    }
    return companyRepository.update(companyId, data);
};

const deleteCompany = async (companyId, userId) => {
    const userCompany = await userCompanyRepository.findFirst(userId, companyId);
    if (!userCompany) {
        throw new Error('User does not belong to this company');
    }
    return await prisma.$transaction(async (transaction) => {
        return companyRepository.softDeleteCompany(companyId, transaction);
    });

};

module.exports = {
    createCompany,
    getCompanyById,
    getCompanies,
    updateCompany,
    deleteCompany,
};