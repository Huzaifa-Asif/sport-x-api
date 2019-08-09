const mongoose = require('mongoose');

const schema = mongoose.Schema;

// Tournament Schema

const tournamentSchema = new schema({
    state:{
        type:String,
        default:"pending"
    },
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
    serviceProviderEmail:{
        type:String
    },
    adderEmail:{
        type:String
    },
    startDate:{
        type:String
    },
    startTime:{
        type:String
    },
    date:{
        type:Date
    }
})


const tournament= module.exports = mongoose.model('Tournament',tournamentSchema);