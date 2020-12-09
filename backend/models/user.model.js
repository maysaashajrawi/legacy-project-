const mongoose= require('mongoose');
const { schema } = require('./addItems.model');
var fs = require('fs');
var path = require('path');
var multer = require('multer');

const Schema = mongoose.Schema;
//creat the Schema, what data we want to be saved
const userSchema = new Schema({
    
    username:{
        type: String,
        required: true,
        unique:true,
        minlength:3,
        trim: true
    },
    password : {
        type: String,
        minlength: 5,
        required: true,
        trim: true
        
    },
    phone: {
        
        type: Number,
         unique:true,
        min:10,
        trim: true,

    },
    address:{
        type: String,
        minlength: 4,
        required: true,
        trim: true
    },
    image:
    {
        type: String,
        required: true,
        trim: true
    }
  
});




const User = mongoose.model('User', userSchema);


// module.exports = new mongoose.model('Image', userSchema);

module.exports = User;

