const dotenv = require('dotenv');
const express = require('express')
// create an express app
const app = express();

const bodyParser = require('body-parser');
const connectDB = require('../src/config/db.js');

//routes
const roleRoutes = require('../src/routes/roleRoutes.js');
const authRoutes = require('../src/routes/authRoutes.js');
const categoriesRoutes = require('../src/routes/categoryRoutes.js');
const productsRoutes = require('../src/routes/productRoutes.js');
const companyRoutes = require('./routes/companyRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const packageRoutes = require('./routes/packageRoutes');
//const invoicesRoutes = require('../src/routes/invoices.js');

// configure dotenv
dotenv.config();

// Middleware
app.use(bodyParser.json());

// Connect to database
connectDB();
app.use(express.json({ limit: "3mb" }));

app.use('/api/roles', roleRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/products', productsRoutes);
app.use('/api', companyRoutes);
app.use('/api', subscriptionRoutes);
app.use('/api/packages', packageRoutes);
//app.use('/api/invoices', invoicesRoutes);
app.use('/api/auth', authRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});