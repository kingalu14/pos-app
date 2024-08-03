const prisma = require('../config/prisma');

class UserRepository {

    async allUsers(){
        return await prisma.user.findMany();
    }

    async getUserById(id){
        return await prisma.user.findUnique({
            where: {
                id
            },
        });
    }
}

module.exports = new UserRepository();