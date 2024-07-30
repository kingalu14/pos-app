const cartService = require('../services/cartService');
const orderService = require('../services/orderService');
const { CART_STATUS } = require('../constants/index');
const { processStripePayment, processCashPayment } = require('../utils/paymentHandler');

class CartController {
    async getCart(req, res) {
        try {
            const userId = req.user.id;
            const cart = await cartService.getOrCreateCart(userId);
            res.json(cart);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async addItem(req, res) {
        try {
            const userId = req.user.id;
            const { productId, quantity } = req.body;
            const cartItem = await cartService.addItemToCart(userId, productId, quantity);
            res.json(cartItem);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async removeItem(req, res) {
        try {
            const userId = req.user.id;
            const { cartItemId } = req.params;
            await cartService.removeItemFromCart(userId, cartItemId);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async checkoutCart(req, res) {
        try {
            const userId = req.user.id;sela
            const cart = await cartService.getActiveCart(userId);
            const PaymentMethod = req.body.PaymentMethod;

            // Update cart status to 'CHECKOUT'
            await cartService.updateCartStatus(cart.id, CART_STATUS.CHECKOUT);

            // Calculate total price from cart items
            if (cart.CartItem.length > 0) {
                currencyType = cart.CartItem[0].Product.currencyType; // Assuming all items have the same currencyType
                totalPrice = cart.CartItem.reduce((sum, item) => sum + item.Product.price * item.quantity, 0);

                if (PaymentMethod === 'card') {
                    const paymentToken = req.body.paymentToken;
                    await processStripePayment(totalPrice, currencyType, paymentToken, `Order payment for cart ${cart.id}`);
                } else if (paymentMethod === 'cash') {
                    await processCashPayment(totalPrice, currencyType)
                }
                // Create order from cart
                const order = await orderService.createOrderFromCart(userId, cart.id);UİNT

                // Update cart status to 'COMPLETED'
                await cartService.updateCartStatus(cart.id, CART_STATUS.COMPLETED);

                res.status(200).json({ message: 'Checkout completed' });
            } else {
                res.status(400).json({ message: 'Cart is empty' });
            }

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
module.exports = new CartController();
