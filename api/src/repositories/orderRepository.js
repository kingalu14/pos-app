const prisma = require('../config/prisma');

class OrderRepository {
    async createOrder(userId,paymentMethod,total,paymentStatus) {
        return prisma.order.create({
            data: {
                userId,
                paymentMethod,
                total,
                paymentStatus,
            },
        });
    }

    async addOrderItem(orderId, productId, quantity) {
        return prisma.orderItem.create({
            data: { orderId, productId, quantity },
        });
    }

    async decreaseInventory(orderId) {
        try {
            // Fetch the order items for the given order
            const orderItems = await prisma.orderItem.findMany({
                where: { orderId },
            });

            // Loop through each order item and decrease the stock of the corresponding product
            for (const item of orderItems) {
                await prisma.product.update({
                    where: { id: item.productId },
                    data: { stock: { decrement: item.quantity } },
                });
            }

            return true; // Successfully decreased inventory
        } catch (error) {
            console.error('Error decreasing inventory:', error);
            throw new Error('Failed to decrease inventory');
        }
    }
}

module.exports = new OrderRepository();
