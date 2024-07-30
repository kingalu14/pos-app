const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema(
    {
       customerName: {type:String,required:true,unique:true}, 
       phoneNumber: {type:String,required:true}, 
       paymentType: {type:String,required:true}, 
       subTotal: {type:Number,required:true}, 
       tax: {type:Number,required:true}, 
       totalAmount: {type:Number,required:true}, 
       cartItems: {type:Array,required:true}, 
    },
    {
      timestamps:true
    }
);

const Invoice = mongoose.model('invoices', InvoiceSchema);
module.exports = Invoice;