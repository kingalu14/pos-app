const cartRepository = require('../repositories/cartRepository');
const productRepository = require('../repositories/productRepository');
const {logInfo,logError} = require('../utils/logger');
const { CART_STATUS } = require('../constants');

class CartService {

    async getOrCreateCart(sessionId) {
        try{
            console.log("CartService getOrCreateCart sessionId",sessionId);
            if(!sessionId){
                logInfo("CartService->getOrCreateCart->User session not created");
                throw new Error('User session not created');
            }
            let cart = await cartRepository.getActiveCart(sessionId);
            if (!cart) {
                cart = await cartRepository.createCart(sessionId);
                console.log("CartService->getOrCreateCart cart created with id",cart.id);
            }
            logInfo('getCart',`cart created id :${cart.cartId} `);
            return cart;
        }catch(error){
            logError('getOrCreateCart->getCart',error);
            res.status(500).json({ error:error.message });        
        }
   
    }
    async updateCartStatus(cartId, status) {
        return cartRepository.updateCartStatus(cartId, status);
    }

    async addItemToCart(sessionId, productId, quantity) {
        try{
            const cart = await this.getOrCreateCart(sessionId);
            logInfo('CartService->addItemToCart->cart',`cart ${cart}`);
            let cartItem = null;
           // Check if the product already exists in the cart
           if(cart){ 
            const existingProductIndex = await cartRepository.existingItem(cart.id,productId);
            console.log("existingProductIndex",existingProductIndex);
            if (existingProductIndex) {
                // Update the quantity if the product exists
                 cartItem = await cartRepository.updateCartItem(cart.id, productId,quantity);
                 logInfo('CartService->addItemToCart->existingProductIndex',`productId ${cartItem} added to cart`);
              } else {
                // Add the new product to the cart
                logInfo('CartService->addItemToCart->cart',`cart ${cart}`);
                const product = await productRepository.getProductById(productId);
                logInfo('CartService->addItemToCart->product',`product ${product}`);
                cartItem =await cartRepository.createCartItem(cart.id, productId,product.price,product.vendorId,quantity);
                logInfo('CartService->addItemToCart->not existingProductIndex',`productId ${cartItem} added to cart`);
              }
           }
           return cartItem;
        }catch(error){
            logError('CartService->addItemToCart',error);
            res.status(500).json({ error:error.message });        
        }    
     }

    async removeItemFromCart(cartItemId) {
        try {
            //Check if the cart item exists
            const cartItem = await cartRepository.getItemById(cartItemId);
            if (!cartItem) {
                throw new Error('Cart item not found');
            }
           // Delete the cart item
            return await cartRepository.removeItemFromCart(cartItemId);
        } catch (error) {
            logError('CartService->removeItemFromCart',error);
            res.status(500).json({ error:error.message });        
        }
    }

    async deleteCart(userId) {
        const cart = await cartRepository.findCartByUserId(userId);
        if (cart) {
            await cartRepository.updateCartStatus(cart.id, 'COMPLETED');
        }
    }

    async getItemById(cartItemId){
        try {
            // Check if the cart item exists
            const cartItem = await cartRepository.getItemById(cartItemId);
            if(!cartItem)
                throw new Error('Cart item not found');
            return cartItem;
        }catch(error){
            logError('CartService->getItemById',error);
            res.status(500).json({ error:error.message });       
        }
 }

    async linkCartToUser(cartId, userId) {
       await cartRepository.linkCartToUser(cartId,userId);
    } 





}

module.exports = new CartService();