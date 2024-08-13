const prisma = require('../config/prisma');

const createProduct = async (vendorId, name, price, categoryId, description, images,currencyType,stock) => {
    const product = await prisma.product.create({
        data: {
            name,
            price,
            categoryId,
            description,
            images,
            vendorId,
            stock,
            currencyType,
            deletedAt: null
        }
    });
    return product;
};

const getProductsByVendor = async (vendorId) => {
    const products = await prisma.product.findMany({
        where: {
            vendorId,
            deletedAt: null
        },
        include: {
            Category: true
        }
    });
    return products;
};


const getProductById = async (vendorId, productId) => {
    const product = await prisma.product.findFirst({
        where: {
            vendorId,
            productId,
            deletedAt: null
        },
        include: {
            Category: true
        }
    });
    return product;
};

const deleteProduct = async (vendorId, productId) => {
    // Ensure productId is provided
    if (!productId) {
        throw new Error('productId is required');
    }

    // Ensure productId is provided
    if (!vendorId) {
        throw new Error('vendorId is required');
    }

    const product = await prisma.product.findFirst({
        where: {
            id: productId,
            vendorId,
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

const updateProduct = async (vendorId, productId, updateData) => {
    const product = await prisma.product.findFirst({
        where: {
            id: productId,
            vendorId,
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

const updateStock = async (vendorId, productId, stock) => {
    await this.validateUpdateStockInput(vendorId, productId, stock);
    const product = await prisma.product.findFirst({
        where: {
            id: productId,
            vendorId,
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

const validateUpdateStockInput = async (vendorId, productId, stock) => {
    // Input validation
    if (!vendorId || typeof vendorId !== 'string') {
      throw new Error('Invalid vendorId');
    }
    if (!productId || typeof productId !== 'string') {
      throw new Error('Invalid productId');
    }
    if (typeof stock !== 'number' || stock < 0) {
      throw new Error('Invalid stock value');
    }
  };

module.exports = {
    createProduct,
    getProductsByVendor,
    getProductById,
    deleteProduct,
    updateProduct,
    updateStock,
    validateUpdateStockInput,
};