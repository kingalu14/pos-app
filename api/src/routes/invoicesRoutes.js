const express = require('express');
const Invoice = require('../models/Invoice');

const router = express.Router();

router.get('/get-all', async (req, res) => {
    try{
        const invoices = await Invoice.find();
        res.status(200).json(invoices);
    }catch(error){
        res.status(500).json({ error: error.message });
    }   

});
// Create a new Product
router.post('/add-invoice', async (req, res) => {
    try {
        console.log(req.body);   
        const invoice = new Invoice(req.body);
        await invoice.save();
        res.status(200).json("invoice added successfully");
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
module.exports = router;