const prisma = require('../config/prisma');

class ProductRepository {

    async decreaseInventory(orderId){

    }

    async  updateStock(vendorId, productId, stock) {
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
}
module.exports = new ProductRepository();