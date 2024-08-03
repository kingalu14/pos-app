const express = require('express');
const cartController = require('../controllers/cartController');
const authenticateToken = require('../middlewares/authenticateToken');

const router = express.Router();

router.get('/', authenticateToken, cartController.getCart);
router.post('/add-item', authenticateToken, cartController.addItem);
router.delete('/remove-item/:cartItemId', authenticateToken, cartController.removeItem);
router.post('/checkout', authenticateToken, cartController.checkoutCart);

module.exports = router;
