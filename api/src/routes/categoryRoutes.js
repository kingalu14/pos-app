const express = require('express');
const {
    createCategory,
    getCategoriesByCompany,
    getCategoryById,
    deleteCategory,
    updateCategory,
} = require('../controllers/categoryContoller');
const authenticateToken = require('../middlewares/authenticateToken');
const checkPermission = require('../middlewares/authorization');

const router = express.Router();

router.post('/add-category', authenticateToken, checkPermission('canAddCategory'), createCategory);
router.put('/update-category/:categoryId', authenticateToken, checkPermission('canEditCategory'), updateCategory);
router.delete('/delete-category/:categoryId', authenticateToken, checkPermission('canDeleteCategory'), deleteCategory);
router.get('/', authenticateToken, checkPermission('canViewCategories'), getCategoriesByCompany);
router.get('/category/:categoryId', authenticateToken, checkPermission('canViewCategory'), getCategoryById);

module.exports = router;