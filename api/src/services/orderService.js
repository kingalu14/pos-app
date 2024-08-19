const orderRepository = require('../repositories/orderRepository');
const cartRepository = require('../repositories/cartRepository');
const productRepository = require('../repositories/productRepository');

class OrderService {
    async createOrderFoUserFromCart(userId,cartId,paymentMethod,total,paymentStatus) {
        // Create a new order
        const order = await orderRepository.createOrder(userId,paymentMethod,total,paymentStatus);

        // Get items from the cart
        const cart = await cartRepository.getCartById(cartId);
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
