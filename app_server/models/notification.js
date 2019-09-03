const mongoose = require('mongoose');

const schema = mongoose.Schema;

// Notification  Schema

const notificationSchema = new schema({
    // _id of Conversation 
    title:{
        type:String
    },
    body:{
        type:String
    },
    email:{
        type:String
    }
})


const Notification= module.exports = mongoose.model('Notifiaction',notificationSchema);