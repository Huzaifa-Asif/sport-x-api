const mongoose = require('mongoose');

const schema = mongoose.Schema;

// Team Schema

const teamSchema = new schema({
    state:{
        type:String,
        default:"pending"
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