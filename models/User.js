const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const UserSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        index:true,
    },
    lastname:{
        type:String,
        required:true,
        index:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    }
});
 
//Export the model
module.exports = mongoose.model('user', UserSchema);