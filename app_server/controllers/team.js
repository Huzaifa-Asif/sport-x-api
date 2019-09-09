var team =require('../models/team.js');

// Get team
module.exports.getTeam = (callback, limit) => {
	team.find(callback).limit(limit);
}

// Get team By ID
module.exports.getTeamById = (id ,callback) =>  {
	team.findById(id, callback);
}

// Get team By ID
module.exports.getTeamByTournament = (id ,callback) =>  {
	team.find({tournamentId:id}, callback);
}

// Add team
module.exports.addTeam = (teamform, callback) => {
	team.create(teamform, callback);
}

// Update team
module.exports.updateTeam = (id, teamform, options, callback) => {
    var query = {_id: id};
    team.findOneAndUpdate(query, teamform, options, callback);
}

// Delete team
module.exports.removeTeam = (id, callback) => {
    var query = {_id: id};
    team.remove(query, callback);
}