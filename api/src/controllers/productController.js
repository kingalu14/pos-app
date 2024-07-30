const productService = require('../services/productService');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createProduct = async (req, res) => {
    try {
        const { name, price, categoryId, description, images,stock, currencyType } = req.body;
        const { userId } = req.user;
        const userCompany = await prisma.userCompany.findFirst({
            where: { userId }
        });

        if (!userCompany) {
            return res.status(403).json({ message: 'You do not belong to any company' });
        }

        const product = await productService.createProduct(userCompany.companyId, name, price, categoryId, description, images, currencyType, stock);
        res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getProductsByCompany = async (req, res) => {
    try {
        const { userId } = req.user;
        const userCompany = await prisma.userCompany.findFirst({
            where: { userId }
        });

        if (!userCompany) {
            return res.status(403).json({ message: 'You do not belong to any company' });
        }

        const products = await productService.getProductsByCompany(userCompany.companyId);
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const getProductById = async (req, res) => {
    try {
        const { userId } = req.user;
        const { productId } = req.params;
        const userCompany = await prisma.userCompany.findFirst({
            where: { userId }
        });

        if (!userCompany) {
            return res.status(403).json({ message: 'You do not belong to any company' });
        }

        const products = await productService.getProductById(userCompany.companyId, productId);
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const deleteProduct = async (req, res) => {
    try {
        const { userId } = req.user;
        const { id } = req.params;
        const userCompany = await prisma.userCompany.findFirst({
            where: { userId }
        });

        if (!userCompany) {
            return res.status(403).json({ message: 'You do not belong to any company' });
        }

        const product = await productService.deleteProduct(userCompany.companyId, id);
        res.status(200).json({ message: 'Product deleted successfully', product });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.user;
        const updateData = req.body;
        const userCompany = await prisma.userCompany.findFirst({
            where: { userId }
        });

        if (!userCompany) {
            return res.status(403).json({ message: 'You do not belong to any company' });
        }

        const product = await productService.updateProduct(userCompany.companyId, id, updateData);
        res.status
            (200).json({ message: 'Product updated successfully', product });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const updateStock = async (req, res) => {
    const { id } = req.params;
    const { userId } = req.user;
    const { stock } = req.body;
    const userCompany = await prisma.userCompany.findFirst({
            where: { userId }
    });
    if (!userCompany) {
        return res.status(403).json({ message: 'You do not belong to any company' });
    }
    try {
        const product = await prisma.product.update({
            where: { id },
            data: { stock }
        });
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



module.exports = {
    createProduct,
    getProductsByCompany,
    getProductById,
    deleteProduct,
    updateProduct,
    updateStock,
};