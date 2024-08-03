const userService = require('../services/userService');

const getUserById = async (req, res)  => {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    res.status(201).json(user);
};

const getUsers = async (req, res)  => {
    const users = await userService.getUsers();
    res.status(201).json(users);
};

module.exports = {
    getUserById,
    getUsers
};