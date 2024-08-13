const prisma = require('../config/prisma');
const { CART_STATUS } = require('../constants');

class CartRepository {

    async getActiveCart(sessionId) {
        // Initialize the cart in the session if it doesn't exist
        const cart = await prisma.cart.findFirst({
            where: {
                sessionId: sessionId,
                status: CART_STATUS.OPEN,
            },
            include: {
                CartItem: true,
            },
        });
        return cart;
    }
    
    async createCart(sessionId) {
        const cart = await prisma.cart.create({
            data: {
                sessionId,
                status: CART_STATUS.OPEN,
            },
        });
        return cart;
    
    }

    async updateCartStatus(cartId, status) {
        return await prisma.cart.update({
            where: { id: cartId },
            data: { status },
        });
    }
    async existingItem(cartId,productId){
       const item = await prisma.cartItem.findFirst({
        where: {
            cartId,
            productId,
        },
      });
      return item;
   }

   async getCartById(cartId){
    const cart = await prisma.cart.findFirst({
     where: {id:cartId},
     include: {
        CartItem: true,
    },
   });
   return cart;
}

    async getItemById(cartItemId){
          // Check if the cart item exists
        const cartItem = await prisma.cartItem.findUnique({
            where: { id: cartItemId },
            include: {
                Product: true,
            },
        });
      return cartItem;
   }

    async updateCartItem(cartId, productId,quantity) {
        const existingItem = await this.existingItem(cartId, productId);
        return await prisma.cartItem.update({
            where: { id: existingItem.id },
            data: {
                quantity: existingItem.quantity + quantity,
            },
        });
    }

    async createCartItem(cartId,productId,quantity){
      const item = await prisma.cartItem.create({
            data: {
                cartId,
                productId,
                quantity,
            },
        });
        return item;
    } 

    async removeItemFromCart(cartItemId) {
        return await prisma.cartItem.delete({
            where: { id: cartItemId },
        });
    }

    async deleteCart(cartId) {
        return await prisma.cart.delete({
            where: { id: cartId },
        });
    }

    async clearCartWithItems(cartId){
        try {
            // First, delete all CartItems associated with the Cart
            await prisma.cartItem.deleteMany({
                where: {
                    cartId: cartId,
                },
            });
    
            // Then, delete the Cart itself
            await prisma.cart.delete({
                where: {
                    id: cartId,
                },
            });
    
            console.log(`Cart and associated items with ID ${cartId} have been cleared.`);
        } catch (error) {
            console.error('Error clearing cart with items:', error);
        }
    };
    
    async linkCartToUser(cartId, userId) {
        await prisma.cart.update({
            where: { id: cartId },
            data: { userId },
        });
    }
}

module.exports = new CartRepository();
