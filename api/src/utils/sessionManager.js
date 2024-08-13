const session = require('express-session');
const dotenv = require('dotenv');
dotenv.config();
const  sessionSecret =process.env.SESSION_SECRET;

class SessionManager {
     // Configure session middleware
    constructor() {
            this.sessionMiddleware = session({
                secret:sessionSecret, // Replace with a strong secret key
                resave: false, // Prevents session from being saved back to the store if not modified
                saveUninitialized: true, // Forces uninitialized session to be saved
                visited:true,
                cookie: { 
                    maxAge:6000*180,
                    secure: false

                } // Set to `true` if using HTTPS
            });
            SessionManager.instance = this;
        return SessionManager.instance;
    }

    getSessionMiddleware() {
        return this.sessionMiddleware;
    }
}

const instance = new SessionManager();
module.exports = instance;
