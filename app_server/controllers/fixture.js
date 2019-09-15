var fixture =require('../models/fixture.js');
var tournament =require('../controllers/tournament.js');
var team =require('../controllers/team.js');


// Create Fixtures
module.exports.createFixture = (tournamentId, callback) => {
	
	team.getTeamByTournament(tournamentId, function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                Message: "Error in Connecting to DB",
                status: false
            });
		}
		else{
			var size=0;
			size = Object.size(result);
			var teams = [];
			var fixtureArray = [];
			var match = {};
			for(i=0;i<size;i++)
			{
				teams.push(result(i)._id);	
			}
			console.log("before"+teams)
			teams=shuffle(teams);
			console.log("after"+teams)

			for(j=0;j<(size-1);j=j+2)
			{	
				match={
					tournamentId:tournamentId,
					team1:result(j)._id,
					team2:result(j+1)._id	
				}
				fixtureArray.push(match);
			}

			fixture.insertMany(fixtureArray, callback);
	

		}
    

    });

	function shuffle(array) {
		array.sort(() => Math.random() - 0.5);
		return array;
	}

	// function createFixture(fixtureArray)
	// {
	// 	fixture.insertMany(fixtureArray, function(error, result2) {
	// 		if(error){

	// 		}
	// 	});

	// }  

	tournament.create(tournamentform, callback);
}

