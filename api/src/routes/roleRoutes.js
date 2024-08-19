const express = require('express');
const router = express.Router();
const {
    createRole,
    createPermission,
    assignPermissionToRole,
    getPermissionsForRole,
    assignRoleToUser
} = require('../controllers/roleController');

const authenticateToken = require('../middlewares/authenticateToken');
const checkPermission = require('../middlewares/authorization');

router.post('/role', createRole);
router.post('/permission', createPermission);
router.post('/assign-permission', assignPermissionToRole);
router.post('/assign-role',assignRoleToUser);
router.get('/role/:roleId/permissions',getPermissionsForRole);



router.post('/role', authenticateToken, createRole);
router.post('/permission', authenticateToken, createPermission);
router.post('/assign-permission', authenticateToken, assignPermissionToRole);
router.post('/assign-role', authenticateToken, assignRoleToUser);
router.get('/role/:roleId/permissions', authenticateToken, getPermissionsForRole);

//router.post('/role', authenticateToken, checkPermission('canCreateRole'), createRole);
//router.post('/permission', authenticateToken, checkPermission('canCreatePermission'), createPermission);
//router.post('/assign-permission', authenticateToken, checkPermission('canAssignPermission'), assignPermissionToRole);
//router.post('/assign-role', authenticateToken, checkPermission('canAssignPermission'), assignRoleToUser);
//router.get('/role/:roleId/permissions', authenticateToken, checkPermission('canViewPermissions'), getPermissionsForRole);

module.exports = router;
