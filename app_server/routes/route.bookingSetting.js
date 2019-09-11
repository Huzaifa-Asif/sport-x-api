var express = require('express');
var router = express.Router();


var bookingSetting = require('../controllers/bookingSetting.js');


//Add Booking Setting
router.post('/add_bookingSetting', function (req, res) {
    var bookingSettingform = req.body;
    bookingSetting.addbookingSetting(bookingSettingform, function (err, bookingSetting) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                Message: "Error in Connecting to DB",
                status: false
            });
        }
        var result = bookingSetting.toObject();
        result.status = true;
        return res.json(result);
    });

});



//Get Booking Setting By service Provider Email
router.get('/get_bookingSetting_by_serviceProvider/:email', function (req, res) {
    bookingSetting.getBookingSettingByServiceProvider(req.params.email, function (err, result) {
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


//Update Booking Setting
router.patch('/update_bookingSetting/:email', function (req, res) {
    var bookingSettingForm = req.body;
    var email = req.params.email;
    bookingSetting.updateBookingSetting(email, bookingSettingForm, {
        new: true
    }, function (err, bookingSetting) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                Message: "Error in Connecting to DB",
                status: false
            });
        } else if (bookingSetting) {
            var result = bookingSetting.toObject();
            result.status = true;
            return res.json(result);
        } else
            return res.status(500).json({
                Message: "No Such Booking Setting Exists",
                status: false
            });
    });

});



module.exports = router;
