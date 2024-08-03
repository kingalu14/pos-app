const roleRepository = require('../repositories/roleRepository');

const createRole = async (name) => {
    const role = await roleRepository.createRole(name);
    return role;
};

const createPermission = async (name, description) => {
    const existingPermission = await roleRepository.existingPermission(name);
    if (existingPermission) {
        throw new Error('Permission already exists');
    }
    const permission = await roleRepository.createPermission(name,description);
    return permission;
};

const assignPermissionToRole = async (roleId, permissionId) => {
    const existingRolePermission = await roleRepository.existingRolePermission(roleId, permissionId);
    if (existingRolePermission) {
         throw new Error('Permission already assigned to this role');
    }
    const rolePermission = await roleRepository.assignPermissionToRole(roleId,permissionId);
    return rolePermission;
};

const assignRoleToUser = async (userId,roleId) => {
    const user = await prisma.user.findUnique({ where: { 
        id:userId,
         }
      });
      if(!user) {
        throw new Error('No record found');
      }
       
    const role = await prisma.role.findUnique({
        where:{
            id:roleId
        }
    })
    if(!role) {
        throw new Error('role not found');
    }
    return roleRepository.assignRoleToUser(roleId, permissionId);
};

const getPermissionsForRole = async (roleId) => {
    const permissions = await roleRepository.getPermissionsForRole(roleId)                 
    return permissions;
};

const existingRolePermission = async (roleId, permissionId) => {
    const permissions = await roleRepository.existingRolePermission(roleId,permissionId);
    return permissions;
};

module.exports = {
    createRole,
    createPermission,
    assignPermissionToRole,
    getPermissionsForRole,
    existingRolePermission,
    assignRoleToUser
};
