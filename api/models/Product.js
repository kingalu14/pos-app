const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
    {
       name: {type:String,required:true,unique:true}, 
       img: {type:String,required:true}, 
       price: {type:Number,required:true}, 
       category: {type:String,required:true}, 
    },
    {
      timestamps:true
    }
);

const Product = mongoose.model('products', ProductSchema);
module.exports = Product;