const productService = require('../services/productService');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createProduct = async (req, res) => {
    try {
        const { name, price, categoryId, description, images,stock, currencyType } = req.body;
        const { userId } = req.user;
        const userVendor = await prisma.userVendor.findFirst({
            where: { userId }
        });

        if (!userVendor) {
            return res.status(403).json({ message: 'You do not belong to any Vendor' });
        }

        const product = await productService.createProduct(userVendor.vendorId, name, price, categoryId, description, images, currencyType, stock);
        res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getProductsByVendor = async (req, res) => {
    try {
        const { userId } = req.user;
        const userVendor = await prisma.userVendor.findFirst({
            where: { userId }
        });

        if (!userVendor) {
            return res.status(403).json({ message: 'You do not belong to any Vendor' });
        }

        const products = await productService.getProductsByVendor(userVendor.vendorId);
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const getProductById = async (req, res) => {
    try {
        const { userId } = req.user;
        const { productId } = req.params;
        const userVendor = await prisma.userVendor.findFirst({
            where: { userId }
        });

        if (!userVendor) {
            return res.status(403).json({ message: 'You do not belong to any Vendor' });
        }

        const products = await productService.getProductById(userVendor.vendorId, productId);
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const deleteProduct = async (req, res) => {
    try {
        const { userId } = req.user;
        const { id } = req.params;
        const userVendor = await prisma.userVendor.findFirst({
            where: { userId }
        });

        if (!userVendor) {
            return res.status(403).json({ message: 'You do not belong to any Vendor' });
        }

        const product = await productService.deleteProduct(userVendor.vendorId, id);
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
        const userVendor = await prisma.userVendor.findFirst({
            where: { userId }
        });

        if (!userVendor) {
            return res.status(403).json({ message: 'You do not belong to any Vendor' });
        }

        const product = await productService.updateProduct(userVendor.vendorId, id, updateData);
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
    const userVendor = await prisma.userVendor.findFirst({
            where: { userId }
    });
    if (!userVendor) {
        return res.status(403).json({ message: 'You do not belong to any Vendor' });
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
    getProductsByVendor,
    getProductById,
    deleteProduct,
    updateProduct,
    updateStock,
};