var express = require('express');
var router = express.Router();
var tournament = require('../controllers/tournament.js');


// Get All the Tournament
router.get('/get_tournament', function (req, res) {
    tournament.getTournament(function (err, result) {
        if (err)
            return res.status(500).json({
                Message: "Error in Connecting to DB",
                status: false
            });

        return res.json(result);

    });

});



//Add Tournament
router.post('/add_tournament', function (req, res) {
    var addTournamentForm = req.body;
    tournament.addTournament(addTournamentForm, function (err, tournament) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                Message: "Error in Connecting to DB",
                status: false
            });
        }
        var result = tournament.toObject();
        result.status = true;
        return res.json(result);
    });

});

//Update Tournament
router.patch('/update_tournament/:id', function (req, res) {
    var tournamentForm = req.body;
    var id = req.params.id;
    tournament.updateTournament(id, tournamentForm, {
        new: true
    }, function (err, tournament) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                Message: "Error in Connecting to DB",
                status: false
            });
        } else if (tournament) {
            var result = tournament.toObject();
            result.status = true;
            return res.json(result);
        } else
            return res.status(500).json({
                Message: "No Such Tournament Exists",
                status: false
            });
    });

});


//Delete Tournament
router.delete('/delete_tournament/:id', function (req, res) {
    var id = req.params.id;
    tournament.removeTournament(id, function (err) {
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

//Get All Tournaments by state
router.get('/get_tournament_by_state/:state', function (req, res) {
    tournament.getTournamentByState(req.params.state, function (err, result) {
        if (err)
            return res.status(500).json({
                Message: "Error in Connecting to DB",
                status: false
            });

        return res.json(result);

    });

});

//Get Tournaments by Id
router.get('/get_tournament_by_id/:id', function (req, res) {
    tournament.getTournamentById(req.params.id, function (err, result) {
        if (err)
            return res.status(500).json({
                Message: "Error in Connecting to DB",
                status: false
            });

        return res.json(result);

    });

});

//Get Tournaments by serviceProvider Email
router.get('/get_tournament_by_serviceProvider/:email', function (req, res) {
    tournament.getTournamentByServiceProviderEmail(req.params.email, function (err, result) {
        if (err)
            return res.status(500).json({
                Message: "Error in Connecting to DB",
                status: false
            });

        return res.json(result);

    });

});

//Get Tournaments by adder Email
router.get('/get_tournament_by_adder/:email', function (req, res) {
    tournament.getTournamentByAdderEmail(req.params.email, function (err, result) {
        if (err)
            return res.status(500).json({
                Message: "Error in Connecting to DB",
                status: false
            });

        return res.json(result);

    });

});



module.exports = router;
