const mongoose = require('mongoose');

const schema = mongoose.Schema;

// Revenue Category Schema

const revenueCategorySchema = new schema({
    name:{
        type:String
    },
    serviceProviderEmail:{
        type:String
    }
})


const revenueCateogry= module.exports = mongoose.model('RevenueCategory',revenueCategorySchema);