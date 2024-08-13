const jwt = require('jsonwebtoken');
const {logInfo,logError} = require('../utils/logger');
const dotenv = require('dotenv');
dotenv.config();
const  jwtSecret =process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.status(401).json({ message: 'Your not authirized, please login.' });

    jwt.verify(token,jwtSecret, (err, user) => {    
        if (err) {
            logError('authenticateToken',err);
            return res.status(403).json({ message: 'Invalid token, please login again.' });
        }
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;
