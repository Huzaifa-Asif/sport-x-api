const mongoose = require('mongoose');

const schema = mongoose.Schema;

// Chatbox Schema

const conversationSchema = new schema({

    customerEmail:{
        type:String
    },
    serviceProviderEmail:{
        type:String
    },
    state:{
        type:String,
        default:"active"
    },
    date:{
        type:Date
    }
})


const Conversation= module.exports = mongoose.model('Conversation',conversationSchema);