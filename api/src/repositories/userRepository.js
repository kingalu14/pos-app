const prisma = require('../config/prisma');

class UserRepository {

    async getUsers(){
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