const mongoose = require('mongoose');

const Userchema = new mongoose.Schema(
    {
       username: {type:String,required:true,unique:true}, 
       email: {type:String,required:true,unique:true}, 
       password: {type:String,required:true,unique:true}, 
    },
    {
      timestamps:true
    }
);

const User = mongoose.model('user', Userchema);
module.exports = User;