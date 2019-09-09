var express = require('express');
var router = express.Router();


var bookingDetails = require('../controllers/bookingDetails.js');


//Update bookingDetails
router.patch('/update_bookingDetails/:id', function (req, res) {
    var bookingDetailsform = req.body;
    var id = req.params.id;
    bookingDetails.updateBookingDetails(id, bookingDetailsform, {
        new: true
    }, function (err, bookingDetails) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                Message: "Error in Connecting to DB",
                status: false
            });
        }
        var result = bookingDetails.toObject();
        result.status = true;
        return res.json(result);
    });

});


//Delete booking details
router.delete('/delete_bookingDetails/:id', function (req, res) {
    var id = req.params.id;
    bookingDetails.removeBookingDetails(id, function (err, bookingDetails) {
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




// Pending Bookings of Vendor
router.get('/serviceProviderPendingBookings/:email', bookingDetails.serviceProviderPendingBookings);

// In Progress Bookings of Vendor
router.get('/serviceProviderInProgressBookings/:email', bookingDetails.serviceProviderInProgressBookings);

// Completed Bookings of Vendor
router.get('/serviceProviderCompletedBookings/:email', bookingDetails.serviceProviderCompletedBookings);


// Pending Bookings of Customer
router.get('/customerPendingBookings/:email', bookingDetails.customerPendingBookings);

// In Progress Bookings of Customer
router.get('/customerInProgressBookings/:email', bookingDetails.customerInProgressBookings);

// Completed Bookings of Customer
router.get('/customerCompletedBookings/:email', bookingDetails.customerCompletedBookings);


// Get All the Booking
router.get('/get_booking', function (req, res) {
    bookingDetails.getBookingDetails(function (err, result) {
        if (err)
            return res.status(500).json({
                Message: "Error in Connecting to DB",
                status: false
            });

        return res.json(result);

    });

});


// Get Booking Details by Email - Service Provider
router.get('/get_bookingdetails/:email', function (req, res) {
    bookingDetails.getBookingDetailsByEmail(req.params.email, function (err, result) {
        if (err)
            return res.status(500).json({
                Message: "Error in Connecting to DB",
                status: false
            });

        return res.json(result);

    });

});


module.exports = router;
