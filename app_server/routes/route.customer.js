var express = require('express');
var router = express.Router();


var customer = require('../controllers/customer.js');




// Get All Customer
router.get('/get_customer', function (req, res) {
    customer.getCustomer(function (err, result) {
        if (err) {
            return res.status(500).json({
                Message: "Error in Connecting to DB",
                status: false
            });
        } else {
            return res.json(result);
        }


    });

});


// Update Customer Profile.
router.patch('/update_customer/:email', function (req, res) {
    var email = req.params.email;
    var customerform = req.body;
    customer.updateCustomer(email, customerform, {
        new: true
    }, function (err, customer) {
        if (err) {
            return res.status(500).json({
                Message: "Error in Connecting to DB",
                status: false
            });
        }
        var result = customer.toObject();
        result.status = true;
        return res.json(result);

    });

});


module.exports = router;
