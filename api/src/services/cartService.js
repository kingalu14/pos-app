const cartRepository = require('../repositories/cartRepository');

class CartService {
    async getOrCreateCart(userId) {
        let cart = await cartRepository.findActiveCartByUserId(userId);
        if (!cart) {
            cart = await cartRepository.createCart(userId);
        }
        return cart;
    }

    async updateCartStatus(cartId, status) {
        return cartRepository.updateCartStatus(cartId, status);
    }

    async addItemToCart(userId, productId, quantity) {
        const cart = await this.getOrCreateCart(userId);
        return cartRepository.addItemToCart(cart.id, productId, quantity);
    }

    async removeItemFromCart(userId, cartItemId) {
        const cart = await this.getOrCreateCart(userId);
        return cartRepository.removeItemFromCart(cartItemId);
    }

    async deleteCart(userId) {
        const cart = await cartRepository.findCartByUserId(userId);
        if (cart) {
            await cartRepository.updateCartStatus(cart.id, 'COMPLETED');
        }
    }
}

module.exports = new CartService();
