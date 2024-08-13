const express = require('express');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3000;

// Configure session middleware
app.use(session({
  secret: 'your-secret-key', // Replace with a strong secret key
  resave: false, // Prevents session from being saved back to the store if not modified
  saveUninitialized: true, // Forces uninitialized session to be saved
  cookie: { secure: false } // Set to `true` if using HTTPS
}));

app.use(express.json()); // To parse JSON request bodies
