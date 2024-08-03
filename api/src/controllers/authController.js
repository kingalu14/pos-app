const authService = require('../services/authService');

const register = async (req, res) => {
    try {
        const { username, email, password, roleId } = req.body;
        const user = await authService.registerUser(username, email, password, roleId);
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const token = await authService.loginUser(username, password);
        res.json({ token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const allUsers = async (req, res) => {
    try {
        const users = await authService.allUsers();
        res.json({ users });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    register,
    login,
    allUsers,
};