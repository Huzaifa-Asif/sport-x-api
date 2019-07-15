const mongoose = require('mongoose');

const schema = mongoose.Schema;

// Tournament Schema

const tournamentSchema = new schema({
    name:{
        type:String
    },
    teams:{
        type:Number
    },
    winningPrize:{
        type:String
    },
    entryFee:{
        type:String
    },
    tournamentType:{
        type:String
    },
    maxDays:{
        type:String
    },
    serviceProvierId:{
        type:String
    }
})


const tournament= module.exports = mongoose.model('Tournament',tournamentSchema);