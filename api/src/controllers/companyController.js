const companyService = require('../services/companyService');

const createCompany = async (req, res) => {
    try {
        const { userId } = req.user;
        const company = await companyService.createCompany(req.body, userId);
        res.status(201).json(company);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.companyId;
        const { userId } = req.user;
        const company = await companyService.getCompanyById(companyId, userId);
        if (company) {
            res.status(200).json(company);
        } else {
            res.status(404).json({ message: 'Company not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCompanies = async (req, res) => {
    try {
        const { userId } = req.user;
        const companies = await companyService.getCompanies(userId);
        if (companies.length === 0) {
            res.status(404).json({ message: 'No companies found' });
            return;
        }
        console.log(companies);
        res.status(200).json(companies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateCompany = async (req, res) => {
    try {
        const { userId } = req.user;
        const company = await companyService.updateCompany(req.params.companyId, req.body, userId);
        res.status(200).json(company);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteCompany = async (req, res) => {
    try {
        const { userId } = req.user;
        await companyService.deleteCompany(req.params.companyId, userId);
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createCompany,
    getCompanyById,
    getCompanies,
    updateCompany,
    deleteCompany,
};
