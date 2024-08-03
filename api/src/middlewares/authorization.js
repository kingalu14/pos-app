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
                include: {
                    Permissions: {
                        include: {
                            Permission: true
                        }
                    }
                }
            });

            if (role && role.Permissions.some(rolePermission => rolePermission.Permission.name === permissionName)) {
                next();
            } else {
                res.status(403).json({ message: 'Forbidden' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
};

module.exports = checkPermission;

