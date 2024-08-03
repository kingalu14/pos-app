const userRepository = require('../repositories/userRepository');

const getUserById = async (userId) => {
    if(!userId){
        throw new Error('UserId must be provided'); 
    }
    return await userRepository.getUserById(userId);
};

const getUsers = async () => {
    return await userRepository.getUsers();
};

module.exports = {
    getUserById,
    getUsers
};