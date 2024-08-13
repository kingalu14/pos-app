const categoryService = require('../services/categoryService');
const prisma = require('../config/prisma');

const createCategory = async (req, res) => {
    try {
        const { name, description, parentId } = req.body;
        const { userId } = req.user;
        const userVendor = await prisma.userVendor.findFirst({
            where: { userId }
        });

        if (!userVendor) {
            return res.status(403).json({ message: 'You do not belong to any Vendor' });
        }
        const category = await categoryService.createCategory(userVendor.vendorId, name, description, parentId);
        res.status(201).json({ message: 'Category created successfully', category });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getCategoriesByVendor = async (req, res) => {
    try {
        const { userId } = req.user;
        const userVendor = await prisma.userVendor.findFirst({
            where: { userId }
        });

        if (!userVendor) {
            return res.status(403).json({ message: 'You do not belong to any Vendor' });
        }
        const categories = await categoryService.getCategoriesByVendor(userVendor.vendorId);
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
        const userVendor = await prisma.userVendor.findFirst({
            where: { userId }
        });

        if (!userVendor) {
            return res.status(403).json({ message: 'You do not belong to any Vendor' });
        }
        const category = await categoryService.getCategoryById(userVendor.vendorId,categoryId);
        res.status(200).json(category);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const { userId } = req.user;
        const { categoryId } = req.params;
        const userVendor = await prisma.userVendor.findFirst({
            where: { userId }
        });

        if (!userVendor) {
            return res.status(403).json({ message: 'You do not belong to any Vendor' });
        }

        const category = await categoryService.deleteCategory(userVendor.vendorId, categoryId);
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
   
        const userVendor = await prisma.userVendor.findFirst({
            where: { userId }
        });

        if (!userVendor) {
            return res.status(403).json({ message: 'You do not belong to any Vendor' });
        }
        const category = await categoryService.updateCategory(userId, categoryId, updateData);
        res.status(200).json({ message: 'Category updated successfully', category });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createCategory,
    getCategoriesByVendor,
    getCategoryById,
    deleteCategory,  
    updateCategory,
};