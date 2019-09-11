var express = require('express');
var router = express.Router();
var team = require('../controllers/team.js');


//Add Team in Tournament
router.post('/add_team', function (req, res) {
    var addTeamForm = req.body;
    team.addTeam(addTeamForm, function (err, team) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                Message: "Error in Connecting to DB",
                status: false
            });
        }
        var result = team.toObject();
        result.status = true;
        return res.json(result);
    });

});

//Update Team
router.patch('/update_team/:id', function (req, res) {
    var teamForm = req.body;
    var id = req.params.id;
    team.updateTeam(id, teamForm, {
        new: true
    }, function (err, team) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                Message: "Error in Connecting to DB",
                status: false
            });
        } else if (team) {
            var result = team.toObject();
            result.status = true;
            return res.json(result);
        } else
            return res.status(500).json({
                Message: "No Such Team Exists",
                status: false
            });
    });

});

//Delete Team
router.delete('/delete_team/:id', function (req, res) {
    var id = req.params.id;
    team.removeTeam(id, function (err) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                Message: "Error in Connecting to DB",
                status: false
            });
        }
        return res.json({
            status: true
        });
    });

});

//Get Team by Id
router.get('/get_team_by_id/:id', function (req, res) {
    team.getTeamById(req.params.id, function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                Message: "Error in Connecting to DB",
                status: false
            });
        }
        return res.json(result);

    });

});

//Get Teams by Tournament
router.get('/get_team_by_tournament/:id', function (req, res) {
    team.getTeamByTournament(req.params.id, function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                Message: "Error in Connecting to DB",
                status: false
            });
        }
        return res.json(result);

    });

});


module.exports = router;
