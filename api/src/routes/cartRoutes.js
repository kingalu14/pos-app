const express = require('express');
const cartController = require('../controllers/cartController');
const authenticateToken = require('../middlewares/authenticateToken');
const checkSessionExpiry = require('../middlewares/checkSessionExpiry');

const router = express.Router();

router.get('/', checkSessionExpiry, cartController.getCart);
router.post('/add-item',checkSessionExpiry, cartController.addItem);
router.delete('/remove-item/:cartItemId',checkSessionExpiry,cartController.removeItem);
router.post('/checkout',authenticateToken,checkSessionExpiry, cartController.checkoutCart);

module.exports = router;
