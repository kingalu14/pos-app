const express = require('express');
const router = express.Router();
const {
    createProduct,
    updateProduct,
    deleteProduct,
    getProductsByCompany,
    getProductById,
    updateStock
} = require('../controllers/productController');
const authenticateToken = require('../middlewares/authenticateToken');
const checkPermission = require('../middlewares/authorization');

router.post('/add-product', authenticateToken, checkPermission('canAddProduct'), createProduct);
router.put('/update-product/:id', authenticateToken, checkPermission('canEditProduct'), updateProduct);
router.delete('/delete-product/:id', authenticateToken, checkPermission('canDeleteProduct'), deleteProduct);
router.get('/', authenticateToken, checkPermission('canViewProducts'), getProductsByCompany);
router.get('/product/:id', authenticateToken, checkPermission('canViewProduct'), getProductById);
router.put('/product/:id/stock', authenticateToken, checkPermission('canUpdateStock'), updateStock);


module.exports = router;
