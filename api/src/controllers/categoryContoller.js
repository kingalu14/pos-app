const categoryService = require('../services/categoryService');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createCategory = async (req, res) => {
    try {
        const { name, description, parentId } = req.body;
        const { userId } = req.user;
        const userCompany = await prisma.userCompany.findFirst({
            where: { userId }
        });

        if (!userCompany) {
            return res.status(403).json({ message: 'You do not belong to any company' });
        }
        const category = await categoryService.createCategory(userCompany.companyId, name, description, parentId);
        res.status(201).json({ message: 'Category created successfully', category });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getCategoriesByCompany = async (req, res) => {
    try {
        const { userId } = req.user;
        const userCompany = await prisma.userCompany.findFirst({
            where: { userId }
        });

        if (!userCompany) {
            return res.status(403).json({ message: 'You do not belong to any company' });
        }
        const categories = await categoryService.getCategoriesByCompany(userCompany.companyId);
        console.log(categories);
        res.status(200).json(categories);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getCategoryById = async (req, res) => {
    try {
        const { userId } = req.user;
        const { categoryId } = req.params;
        const userCompany = await prisma.userCompany.findFirst({
            where: { userId }
        });

        if (!userCompany) {
            return res.status(403).json({ message: 'You do not belong to any company' });
        }
        const category = await categoryService.getCategoryById(userCompany.companyId,categoryId);
        res.status(200).json(category);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const { userId } = req.user;
        const { categoryId } = req.params;
        const userCompany = await prisma.userCompany.findFirst({
            where: { userId }
        });

        if (!userCompany) {
            return res.status(403).json({ message: 'You do not belong to any company' });
        }

        const category = await categoryService.deleteCategory(userCompany.companyId, categoryId);
        res.status(200).json({ message: 'Category deleted successfully', category });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const updateCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const { userId } = req.user;
        const updateData = req.body;
        console.log('categoryId:', categoryId);
   
        const userCompany = await prisma.userCompany.findFirst({
            where: { userId }
        });

        if (!userCompany) {
            return res.status(403).json({ message: 'You do not belong to any company' });
        }
        const category = await categoryService.updateCategory(userId, categoryId, updateData);
        res.status(200).json({ message: 'Category updated successfully', category });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createCategory,
    getCategoriesByCompany,
    getCategoryById,
    deleteCategory,  
    updateCategory,
};