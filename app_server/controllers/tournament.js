var tournament =require('../models/tournament.js');

// Get tournament
module.exports.getTournament = (callback, limit) => {
	tournament.find(callback).limit(limit);
}
 


// Get tournament By ID
module.exports.getTournamentById = (id ,callback) =>  {
	tournament.findById(id, callback);
}

// Get tournament By State
module.exports.getTournamentByState = (state ,callback) =>  {
	tournament.find({state:state}, callback);
}

// Get tournaments By serviceProvider Email
module.exports.getTournamentByServiceProviderEmail = (email ,callback) =>  {
	tournament.find({serviceProviderEmail:email}, callback);
}

// Get tournaments By Adder Email
module.exports.getTournamentByAdderEmail = (email ,callback) =>  {
	tournament.find({adderEmail:email}, callback);
}


// Add tournament
module.exports.addTournament = (tournamentform, callback) => {
	tournament.create(tournamentform, callback);
}

// Update tournament
module.exports.updateTournament = (id, tournamentform, options, callback) => {
    var query = {_id: id};
    tournament.findOneAndUpdate(query, tournamentform, options, callback);
}

// Delete tournament
module.exports.removeTournament = (id, callback) => {
    var query = {_id: id};
    tournament.remove(query, callback);
}