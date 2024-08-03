const prisma = require('../config/prisma');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const registerUser = async (username, email, password, roleId) => {
    const existingUser = await prisma.user.findFirst({
        where: {
            OR: [
                { username },
                { email }
            ]
        }
    });
    if (existingUser) {
        throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
        data: { username, email, password: hashedPassword, roleId }
    });

    return newUser;
};

const loginUser = async (username, password) => {
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
        throw new Error('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ userId: user.id, roleId: user.roleId }, 'your_jwt_secret', { expiresIn: '1h' });

    return token;
};


const allUsers = async () => {
    const users = await prisma.user.findMany();
    if (!users) {
        throw new Error('No record found credentials');
    }
    return users;
};


module.exports = {
    registerUser,
    loginUser,
    allUsers,
};