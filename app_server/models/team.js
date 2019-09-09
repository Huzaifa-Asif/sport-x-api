const mongoose = require('mongoose');

const schema = mongoose.Schema;

// Team Schema

const teamSchema = new schema({
    state:{
        type:String
    },
    name:{
        type:String
    },
    players : {
        type: [String]
        },
    tournamentId:{
        type:String
    },
    adderEmail:{
        type:String
    },
    teamContact:{
        type:String
    }
})


const team= module.exports = mongoose.model('Team',teamSchema);