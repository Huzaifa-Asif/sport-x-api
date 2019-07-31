const mongoose = require('mongoose');

const schema = mongoose.Schema;

// Chatbox Schema

const chatboxMessagesSchema = new schema({
    // _id of chatbox
    chatboxId:{
        type:String
    },
    senderId:{
        type:String
    },
    message:{
        type:String
    },
    type:{
        type:String
    },
    file_path:{
        type:String
    },
    date:{
        type:Date
    }
})


const chatboxMessages= module.exports = mongoose.model('ChatboxMessages',chatboxMessagesSchema);