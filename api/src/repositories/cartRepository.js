const prisma = require('../config/prisma');
const { CART_STATUS } = require('../constants');

class CartRepository {
    async findActiveCartByUserId(userId) {
        return prisma.cart.findFirst({
            where: {
                userId,
                status: CART_STATUS.OPEN,
            },
            include: {
                CartItem: true,
            },
        });
    }

    async createCart(userId) {
        return prisma.cart.create({
            data: {
                userId,
                status: CART_STATUS.OPEN,
            },
        });
    }

    async updateCartStatus(cartId, status) {
        return prisma.cart.update({
            where: { id: cartId },
            data: { status },
        });
    }

    async addItemToCart(cartId, itemData) {
        return prisma.cartItem.create({
            data: {
                cartId,
                ...itemData,
            },
        });
    }

    async removeItemFromCart(cartItemId) {
        return prisma.cartItem.delete({
            where: { id: cartItemId },
        });
    }

    async deleteCart(cartId) {
        return prisma.cart.delete({
            where: { id: cartId },
        });
    }
}

module.exports = new CartRepository();
