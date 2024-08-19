const prisma = require('../config/prisma');

const checkPermission = (permissionName) => {
    return async (req, res, next) => {
        try {
            const user = req.user; // Assuming user is already authenticated and available in req.user
            if(!user.roleId){
                throw new Error('Not Authorized for this action');
            }
            const role = await prisma.role.findFirst({
                where: {
                    id: user.roleId
                },
            });
            if(!role){
                throw new Error('Not Authorized for this action');
            }
            let permissions = [];
            const usersPermissions = await userWithPermissions(req.user.userId);
            usersPermissions.role.permissions.forEach(p => {
              permissions.push(p.permission.name);
            });
            if (permissions.includes(permissionName) || permissions.includes("all")){
                next();
            } else {
                res.status(403).json({ message: 'Forbidden' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
};

const userWithPermissions = async (userId) => {
  return  await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      role: {
        include: {
          permissions: {
            include: {
              permission: true,
            },
          },
        },
      },
    },
  });
};

module.exports =  checkPermission
