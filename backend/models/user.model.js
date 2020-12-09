const mongoose= require('mongoose');
const { schema } = require('./addItems.model');

const Schema = mongoose.Schema;
//creat the Schema, what data we want to be saved
const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique:true,
        min:3,
        max:255,
        trim: true
    },
    password : {
        type: String,
        min: 6,
        max:1024,
        required: true
        
    },
    phone: {
        
        type: Number,
         unique:true,
        min:10,
        max:255,
    },
    address:{
        type: String,
        min: 4,
        required: true
    }
    // image:{type:String,required: true, trim: true}

   
    
});

const User = mongoose.model('User', userSchema);

module.exports = User;
