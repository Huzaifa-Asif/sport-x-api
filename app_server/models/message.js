const mongoose = require('mongoose');

const schema = mongoose.Schema;

// Message  Schema

const messageSchema = new schema({
    // _id of Conversation 
    conversationId:{
        type:String
    },
    senderEmail:{
        type:String
    },
    message:{
        type:String
    },
    type:{
        type:String,
        default:"text"
    },
    image_path:{
        type:String
    },
    date:{
        type:Date
    }
})


const Message= module.exports = mongoose.model('Message',messageSchema);