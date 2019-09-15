const mongoose = require('mongoose');

const schema = mongoose.Schema;

// Tournament Fixtures Schema

const fixtureSchema = new schema({

    tournamentId:{
        type:String
    },
    team1:{
        type:String
    },
    team2:{
        type:String
    }

})


const fixture= module.exports = mongoose.model('Fixture',fixtureSchema);