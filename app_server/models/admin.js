const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const schema = mongoose.Schema;

// Admin Schema

const adminSchema = new schema({
   
    email:{
        type:String
    },
    password:{
        type:String
    },
    role:
    {
        type:Number,
        default:0
    }
    

})
adminSchema.methods.hashPassword = function(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(10))
}
adminSchema.methods.comparePassword = function(password,hash){
    return bcrypt.compareSync(password,hash)
}

const admin= module.exports = mongoose.model('Admin',adminSchema);