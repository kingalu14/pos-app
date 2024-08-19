const cartService = require('../services/cartService');
const orderService = require('../services/orderService');
const productService = require('../services/productService');
const { CART_STATUS } = require('../constants/index');
const { processStripePayment, processCashPayment } = require('../utils/paymentHandler');
const {logInfo,logError} = require('../utils/logger');

class CartController {
   
    async getCart(req, res) {
        try {
            const session = req.session;
            const cart = await cartService.getOrCreateCart(session.id);
            console.log("cart",cart);
            logInfo('getCart',`cart created id :${cart.cartId} `);
            res.json(cart);
        } catch (error) {  
           logError('CartController->getCart',error);
            res.status(500).json({ error:error.message });        
        }
    }

    async addItem(req, res) {
        const { productId, quantity } = req.body;
        // Initialize the cart in the session if it doesn't exist
        const sessionId = req.session.id;
        try {
            const cartItem =  await cartService.addItemToCart(sessionId,productId,quantity);
            logInfo('CartController->addItem',`productId ${productId} added to cart`);
            console.log("cartItem",cartItem);
            res.json(cartItem);
        } catch (error) {
            logError('CartController->addItem',error);
            res.status(500).json({ error: error.message });
        } 
    }

    async removeItem(req, res) {
        try {
            const { cartItemId } = req.params;
            await cartService.removeItemFromCart(cartItemId);
            logInfo('removeItem',`productId ${cartItemId} removed from cart`);
            res.status(204).send();
        } catch (error) {
            logError('removeItem',error);
            res.status(500).json({ error: error.message });
        }
    }

    async checkoutCart(req, res) {
        try { 
            // If user is not logged in, force login or sign up
            if (!req.user) {
                return res.status(401).json({ message: 'Please login to proceed with the checkout.' });
            }
     
            const cart = await cartService.getOrCreateCart(req.session.id);
            if(!cart.CartItem || cart.CartItem.length <= 0){
                return res.status(400).json({ message: 'Cart is empty' });         
            }
            //Link the cart to the logged-in user if necessary
            if (!cart.userId) {
                await cartService.linkCartToUser(cart.id, req.user.id);
            }

            //Update cart status to 'CHECKOUT'
            await cartService.updateCartStatus(cart.id, CART_STATUS.CHECKOUT);

             // Group cart items by vendor
            const itemsByVendor = cart.CartItem.reduce((acc, item) => {
                if (!acc[item.vendorId]) {
                    acc[item.vendorId] = [];
                }
                acc[item.vendorId].push(item);
                return acc;
            }, {});
            console.log("itemsByVendor",itemsByVendor);
            const orders = [];

            // for (const [vendorId, items] of Object.entries(itemsByVendor)) {
            //     // Calculate total price for the vendor's products
            //     const currencyType = items[0].Product.currencyType; // Assuming all items have the same currencyType
            //     const totalPrice = items.reduce((sum, item) => sum + item.Product.price * item.quantity, 0);
    
            //     // Process payment (you may need to split the payment by vendor or handle it in one go)
            //     const paymentMethod = req.body.paymentMethod;
            //     if (paymentMethod === 'card') {
            //         const paymentToken = req.body.paymentToken;
            //         await processStripePayment(totalPrice, currencyType, paymentToken, `Order payment for vendor ${vendorId}`);
            //     } else if (paymentMethod === 'cash') {
            //         await processCashPayment(totalPrice, currencyType);
            //     }
    
            //     // Create order for the vendor
            //     const order = await orderService.createOrderForVendor(req.user.id, vendorId, items);
            //     orders.push(order);
            // }
            
            // Calculate total price from cart items
            console.log("cart.CartItem",cart.CartItem);
            const productItem = await cartService.getItemById( cart.CartItem[0].id);
            console.log("item",productItem);
            const currencyType = productItem.Product.currencyType; // Assuming all items have the same currencyType
            let totalPrice = cart.CartItem.reduce((sum, item) => sum + productItem.Product.price * item.quantity, 0);

           // Process payment and other order creation logic here
           const paymentMethod = req.body.PaymentMethod;
           let paymentDetails = null;
            if (paymentMethod === 'card') {
                const paymentToken = req.body.paymentToken;
                paymentDetails=  await processStripePayment(totalPrice, currencyType, paymentToken, `Order payment for cart ${cart.id}`);
            } else if (paymentMethod === 'cash') {
                paymentDetails= await processCashPayment(totalPrice, currencyType)
            }

            // Create order from cart
            const order = await orderService.createOrderFromCart(req.user.userId,cart.id,paymentMethod,totalPrice,paymentDetails.status);

            // Update cart status to 'COMPLETED'
            await cartService.updateCartStatus(cart.id, CART_STATUS.COMPLETED);
            logInfo('checkoutCart',`orderId ${order.id} COMPLETED`);
            res.status(200).json({ message: 'Checkout completed' });  
        } catch (error) {
            logError('checkoutCart',error);
            res.status(500).json({ error: error.message });
        }
    }

}

module.exports = new CartController();