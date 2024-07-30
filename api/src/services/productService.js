const prisma = require('../config/prisma');

const createProduct = async (companyId, name, price, categoryId, description, images,currencyType,stock) => {
    const product = await prisma.product.create({
        data: {
            name,
            price,
            categoryId,
            description,
            images,
            companyId,
            stock,
            currencyType,
            deletedAt: null
        }
    });
    return product;
};

const getProductsByCompany = async (companyId) => {
    const products = await prisma.product.findMany({
        where: {
            companyId,
            deletedAt: null
        },
        include: {
            Category: true
        }
    });
    return products;
};


const getProductById = async (companyId, productId) => {
    const product = await prisma.product.findFirst({
        where: {
            companyId,
            productId,
            deletedAt: null
        },
        include: {
            Category: true
        }
    });
    return product;
};

const deleteProduct = async (companyId, productId) => {
    // Ensure productId is provided
    if (!productId) {
        throw new Error('productId is required');
    }

    // Ensure productId is provided
    if (!companyId) {
        throw new Error('companyId is required');
    }

    const product = await prisma.product.findFirst({
        where: {
            id: productId,
            companyId,
            deletedAt: null
        }
    });

    if (!product) {
        throw new Error('Product not found or you do not have permission to delete this product');
    }
    const deletedProduct = await prisma.product.update({
        where: { id: productId },
        data: { deletedAt: new Date() }
    });
    return deletedProduct;
};

const updateProduct = async (companyId, productId, updateData) => {
    const product = await prisma.product.findFirst({
        where: {
            id: productId,
            companyId,
            deletedAt: null
        }
    });

    if (!product) {
        throw new Error('Product not found or you do not have permission to update this product');
    }

    const updatedProduct = await prisma.product.update({
        where: { id: productId },
        data: { ...updateData, updatedAt: new Date() }
    });

    return updatedProduct;
};

const updateStock = async (companyId, productId, stock) => {
    const product = await prisma.product.findFirst({
        where: {
            id: productId,
            companyId,
            deletedAt: null
        }
    });
    if (!product) {
        throw new Error('Product not found or you do not have permission to update this product');
    }
    try {
        const product = await prisma.product.update({
            where: { productId },
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