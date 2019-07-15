const mongoose = require('mongoose');

const schema = mongoose.Schema;

// Team Schema

const teamSchema = new schema({
    name:{
        type:String
    },
    players : {
        type: [String]
        },
    tournamentId:{
        type:String
    },
    adderId:{
        type:String
    }
})


const team= module.exports = mongoose.model('Team',teamSchema);