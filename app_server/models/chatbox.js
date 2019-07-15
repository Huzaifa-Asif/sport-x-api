const mongoose = require('mongoose');

const schema = mongoose.Schema;

// Chatbox Schema

const chatboxSchema = new schema({
    message:{
        type:Number
    },
    senderId:{
        type:String
    },
    recieverId:{
        type:String
    },
    date:{
        type:Date
    },
    time:{
        type:String
    }
})


const chatbox= module.exports = mongoose.model('Chatbox',chatboxSchema);