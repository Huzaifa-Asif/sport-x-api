const mongoose = require('mongoose');

const schema = mongoose.Schema;

// Revenue Schema

const revenueSchema = new schema({
    revenueCategory:{
        type:String
    },
    amount:{
        type:Number
    },
    customerEmail:{
        type:String
    },
    bookingId:
    {
        type:String
    },
    serviceProviderEmail:{
        type:String
    },
    date:{
        type:String
    },
    description:{
        type:String
    }
})


const revenue= module.exports = mongoose.model('Revenue',revenueSchema);