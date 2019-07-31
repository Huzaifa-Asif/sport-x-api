const mongoose = require('mongoose');

const schema = mongoose.Schema;

// Chatbox Schema

const chatboxSchema = new schema({

    customerEmail:{
        type:String
    },
    serviceProviderEmail:{
        type:String
    },
    status:{
        type:String
    },
    date:{
        type:Date
    }
})


const chatbox= module.exports = mongoose.model('Chatbox',chatboxSchema);