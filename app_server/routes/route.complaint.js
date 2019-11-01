var express = require('express');
var router = express.Router();


var complaint = require('../controllers/complaint.js');


//Add complaint
router.post('/add_complaint', function (req, res) {
    var complaintform = req.body;
    complaint.addComplaint(complaintform, function (err, complaint) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                Message: "Error in Connecting to DB",
                status: false
            });
        }
        var result = complaint.toObject();
        result.status = true;
        return res.json(result);
    });

});



//Get All complaints
router.get('/get_complaints', function (req, res) {
    complaint.getComplaints(function (err, result) {
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
