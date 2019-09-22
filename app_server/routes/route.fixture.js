var express = require('express');
var router = express.Router();
var fixture = require('../controllers/fixture.js');

//Create Fixture
router.post('/create_fixture', function (req, res) {
    var tournamentId = req.body.tournamentId;
   
    fixture.createFixture(tournamentId, function (err, fixtureTeam) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                Message: "Error in Connecting to DB",
                status: false
            });
        }
        else{
            var result = fixtureTeam;
            // result.status = true;
            return res.json(result);
        }


    });

});




module.exports = router;
