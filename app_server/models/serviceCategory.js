const mongoose = require('mongoose');

const schema = mongoose.Schema;

// Service Category Schema

const serviceCategorySchema = new schema({
    name:{
        type:String
    },
    picture:{
        type:String
    }
})


const serviceCateogry= module.exports = mongoose.model('serviceCategory',serviceCategorySchema);