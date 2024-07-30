const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');
const authenticateToken = require('../middlewares/authenticateToken');
const verifyCompany = require('../middlewares/verifyCompany');
const checkCompanyActive = require('../middlewares/checkCompanyActive');
const checkPermission = require('../middlewares/authorization');

router.get('/companies', authenticateToken, checkPermission('canViewCompanies'), companyController.getCompanies);
router.post('/companies', authenticateToken, checkPermission('canCreateCompany'), companyController.createCompany);
router.get('/companies/:companyId', authenticateToken, checkPermission('canViewCompany'), verifyCompany, checkCompanyActive, companyController.getCompanyById);
router.put('/companies/:companyId', authenticateToken, checkPermission('canUpdateCompany'), verifyCompany,checkCompanyActive, companyController.updateCompany);
router.delete('/companies/:companyId', authenticateToken, checkPermission('canDeleteCompany'), verifyCompany,checkCompanyActive, companyController.deleteCompany);

// Add this middleware to other routes as needed

module.exports = router;
