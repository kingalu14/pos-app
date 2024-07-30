const roleService = require('../services/roleService');

const createRole = async (req, res) => {
    const { name } = req.body;
    try {
        const role = await roleService.createRole(name);
        res.status(201).json(role);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const createPermission = async (req, res) => {
    const { name, description } = req.body;
    try {
        const permission = await roleService.createPermission(name, description);
        res.status(201).json(permission);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const assignPermissionToRole = async (req, res) => {
    const { roleId, permissionId } = req.body;
    try {
        const rolePermission = await roleService.assignPermissionToRole(roleId, permissionId);  
        res.status(201).json(rolePermission);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPermissionsForRole = async (req, res) => {
    const { roleId } = req.params;
    try {
        const permissions = await roleService.getPermissionsForRole(roleId);
        res.status(200).json(permissions);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createRole,
    createPermission,
    assignPermissionToRole,
    getPermissionsForRole
};
