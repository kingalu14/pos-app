const dotenv = require('dotenv');
const express = require('express');
const sessionManager = require('./utils/sessionManager');
dotenv.config();

// create an express app
const app = express();
const bodyParser = require('body-parser');
const connectDB = require('../src/config/db.js');

// Apply the singleton session middleware to your Express app
app.use(sessionManager.getSessionMiddleware());
  
//   app.use('/', function(req,res){
//      res.send("hello");
//      console.log(req.session);
//      console.log(req.session.id);
//   });



const roleRoutes = require('../src/routes/roleRoutes.js');
const authRoutes = require('../src/routes/authRoutes.js');
const categoriesRoutes = require('../src/routes/categoryRoutes.js');
const productsRoutes = require('../src/routes/productRoutes.js');
const vendorRoutes = require('./routes/vendorRoutes');
// const subscriptionRoutes = require('./routes/subscriptionRoutes');
// const packageRoutes = require('./routes/packageRoutes');
const cartRoutes = require('./routes/cartRoutes');
const userRoutes = require('./routes/userRoutes');
//const invoicesRoutes = require('../src/routes/invoices.js');



// Middleware
app.use(bodyParser.json());

// Connect to database
connectDB();
app.use(express.json({ limit: "3mb" }));

app.use('/api/roles', roleRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/products', productsRoutes);
app.use('/api', vendorRoutes);
// app.use('/api', subscriptionRoutes);
// app.use('/api/packages', packageRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/users', userRoutes);
//app.use('/api/invoices', invoicesRoutes);
app.use('/api/auth', authRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});