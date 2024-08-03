const prisma = require('../config/prisma');

const createRole = async (name) => {
    const role = await prisma.role.create({
        data: {
            name
        }
    });
    return role;
};

const createPermission = async (name, description) => {
    const permission = await prisma.permission.create({
        data: {
            name,
            description
        }
    });
    return permission;
};

const assignPermissionToRole = async (roleId, permissionId) => {
    const rolePermission = await prisma.rolePermission.create({
        data: {
            roleId,
            permissionId
        }
    });
    return rolePermission;
};

const assignRoleToUser = async (userId,roleId) => {
      return await prisma.user.update({ where: { id:userId },   data: { roleId }, });
};

const getPermissionsForRole = async (roleId) => {
    const permissions = await prisma.permission.findMany({
        where: {
            RolePermission: {
                some: {
                    roleId
                }
            }
        }
    });
    return permissions;
};

const existingRolePermission = async (roleId, permissionId) => {
    const permissions = await prisma.rolePermission.findUnique({
        where: {
            roleId_permissionId: {
                roleId,
                permissionId,
            },
        },
    });
    return permissions;
};
const existingPermission = async (name) => {
    const permissions = await prisma.permission.findUnique({
        where: {
            name
        },
    });
    return permissions;
};

module.exports = {
    createRole,
    createPermission,
    assignPermissionToRole,
    getPermissionsForRole,
    existingRolePermission,
    existingPermission,
    assignRoleToUser
};
