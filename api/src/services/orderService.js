const orderRepository = require('../repositories/orderRepository');
const cartRepository = require('../repositories/cartRepository');

class OrderService {
    async createOrderFromCart(userId, cartId) {
        // Create a new order
        const order = await orderRepository.createOrder(userId, 'PENDING');

        // Get items from the cart
        const cart = await cartRepository.findCartByUserId(userId);
        if (!cart || cart.id !== cartId) {
            throw new Error('Cart not found');
        }

        // Transfer cart items to order items
        for (const cartItem of cart.CartItem) {
            await orderRepository.addOrderItem(order.id, cartItem.productId, cartItem.quantity);
        }

        // Update inventory here
        await productRepository.decreaseInventory(order.id);
     
        return order;
    }
}

module.exports = new OrderService();
