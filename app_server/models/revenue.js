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
    customerId:{
        type:String
    },
    serviceProviderId:{
        type:String
    },
    date:{
        type:Date
    }
})


const revenue= module.exports = mongoose.model('Revenue',revenueSchema);