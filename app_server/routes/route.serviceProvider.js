var express = require('express');
var router = express.Router();
var serviceProvider = require('../controllers/serviceProvider.js');
var customer = require('../controllers/customer.js');

// Signup for serviceProvider
router.post('/signup_serviceProvider', function (req, res) {
    var serviceProviderform = req.body;
    serviceProvider.checkServiceProviderEmail(serviceProviderform.email, function (err, result) {
        if (err)
            return res.status(500).json({
                Message: "Error in Connecting to DB",
                status: false
            });
        else {
            if (result)
                return res.json({
                    Message: "Email Already Exists",
                    status: false
                });
            else {
                customer.checkCustomerEmail(serviceProviderform.email, function (err, result) {
                    if (err)
                        return res.status(500).json({
                            Message: "Error in Connecting to DB",
                            status: false
                        });
                    else {
                        if (result)
                            return res.json({
                                Message: "Username Already Exists",
                                status: false
                            });
                        else {
                            serviceProvider.addServiceProvider(serviceProviderform, function (err, serviceProvider) {
                                if (err) {
                                    return res.status(500).json({
                                        Message: "Error in Connecting to DB",
                                        status: false
                                    });
                                }
                                var result = serviceProvider.toObject();
                                result.status = true;
                                return res.json(result);

                            });
                        }

                    }
                });

            }
        }

    });
});

// Get All Service Provider
router.get('/get_serviceProvider', function (req, res) {
    serviceProvider.getServiceProvider(function (err, result) {
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



// Get Service Provider by category
router.get('/search/serviceProviderByCategory/:category', function (req, res) {
    serviceProvider.getServiceProviderByCategory(req.params.category, function (err, serviceProviders) {
        if (err) {
            return res.status(500).json({
                Message: "Error in Connecting to DB",
                status: false
            });
        } else if (serviceProviders) {
            let obj = {
                status: true
            };
            serviceProviders.unshift(obj);
            return res.json(serviceProviders);
        } else
            return res.status(500).json({
                Message: "No service Providers found with the category " + req.params.category,
                status: false
            });
    });

});


// Get Service Provider by email
router.get('/search/serviceProviderByEmail/:email', function (req, res) {
    serviceProvider.getServiceProviderByEmail(req.params.email, function (err, serviceProviders) {
        if (err) {
            return res.status(500).json({
                Message: "Error in Connecting to DB",
                status: false
            });
        } else if (serviceProviders)
        {
            return res.json(serviceProviders);
        }
        else
        {
            return res.status(500).json({
                Message: "No service Providers found with Names like " + req.params.name,
                status: false
            });
        }
    });

});


// Get Service Provider by name
router.get('/search/serviceProviderByName/:name', function (req, res) {
    serviceProvider.getServiceProviderByName(req.params.name, function (err, serviceProviders) {
        if (err) {
            return res.status(500).json({
                Message: "Error in Connecting to DB",
                status: false
            });
        } else if (serviceProviders)
            return res.json(serviceProviders);
        else
            return res.status(500).json({
                Message: "No service Providers found with Names like " + req.params.name,
                status: false
            });

    });

});


// Get Service Provider by address
router.get('/search/serviceProviderByAddress/:keyword', function (req, res) {
    serviceProvider.getServiceProviderByAddress(req.params.keyword, function (err, serviceProviders) {
        if (err) {
            return res.status(500).json({
                Message: "Error in Connecting to DB",
                status: false
            });
        } else if (serviceProviders)
            return res.json(serviceProviders);
        else
            return res.status(500).json({
                Message: "No service Providers found with address containing " + req.params.keyword,
                status: false
            });

    });

});


// Get Service Provider by location
router.get('/search/serviceProviderByLocation/:lat/:long/:maxDistance', function (req, res) {
    serviceProvider.getServiceProviderByLocation(req.params.lat, req.params.long, req.params.maxDistance, function (err, serviceProviders) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                Message: "Error in Connecting to DB",
                status: false
            });
        } else if (serviceProviders)
            return res.json(serviceProviders);
        else
            return res.status(500).json({
                Message: "No service Providers found within specified area",
                status: false
            });

    });

});



// Update serviceProvider Profile
router.patch('/update_serviceProvider/:email', function (req, res) {
    var email = req.params.email;
    var serviceProviderform = req.body;
    serviceProvider.updateServiceProvider(email, serviceProviderform, {
        new: true
    }, function (err, serviceProvider) {
        if (err) {
            return res.status(500).json({
                Message: "Error in Connecting to DB",
                status: false
            });
        }

        if (serviceProvider != null) {
            var result = serviceProvider.toObject();
            result.status = true;
            return res.json(result);
        } else {
            return res.json({
                Message: "System Error",
                status: false
            });
        }



    });

});



//Compare Service Providers
router.post('/compare', function (req, res) {
    serviceProvider.compareServiceProviders(req.body.email1,req.body.email2,req.body.location,req, res);
});




module.exports = router;
