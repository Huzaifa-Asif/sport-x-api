var express = require('express');
var router = express.Router();

var bookingDetails = require('../controllers/bookingDetails.js');
var customer = require('../controllers/customer.js');
var serviceProvider = require('../controllers/serviceProvider.js');
var functions = require('../controllers/functions.js');
var message = require('../controllers/message.js');
var conversation = require('../controllers/conversation.js');

router.get('/', function (req, res) {
    res.json({
        message: "Welcome to Sport-X Backend"
    })
});


// Signup for customer
router.post('/signup_customer', function (req, res) {
    var customerform = req.body;
    customer.checkCustomerEmail(customerform.email, function (err, result) {
        if (err) {
            return res.status(500).json({
                Message: "Error in Connecting to DB",
                status: false
            });
        } else {
            if (result) {
                return res.json({
                    Message: "Email Already Exists",
                    status: false
                });
            } else {
                serviceProvider.checkServiceProviderEmail(customerform.email, function (err, result) {
                    if (err) {
                        return res.status(500).json({
                            Message: "Error in Connecting to DB",
                            status: false
                        });
                    } else if (result) {
                        return res.json({
                            Message: "Email Already Exists",
                            status: false
                        });
                    } else {
                        customer.addCustomer(customerform, function (err, customer) {
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
                    }
                });
            }
        }

    });
});


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

// Login for both serviceProvider and Customer
router.post('/login', function (req, res) {
    let email = req.body.email;
    let password = req.body.password;
    functions.login(email, password, res);

});

//Get Messages by Conversation Id
router.get('/get_message_by_conversationId/:id', function (req, res) {

    message.getMessageByConversationId(req.params.id, function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                Message: "Error in Connecting to DB",
                status: false
            });
        } else {
            let conversationId = result[0].conversationId;
            conversation.getConversationById(conversationId, async function (err, conversation) {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        Message: "Error in Connecting to DB",
                        status: false
                    });
                } else {
                    let customerEmail = conversation.customerEmail;
                    let serviceProviderEmail = conversation.serviceProviderEmail;
                    let customerName, serviceProviderName, customerPicture, serviceProviderPicture;
                    customer.getCustomerByEmail(customerEmail, function (err, customer) {
                        if (err) {
                            console.log(err);
                            return res.status(500).json({
                                Message: "Error in Connecting to DB",
                                status: false
                            });
                        } else {
                            customerName = customer.name;
                            customerPicture = customer.picture;
                            serviceProvider.getServiceProviderByEmail(serviceProviderEmail, function (err, serviceProvider) {
                                if (err) {
                                    console.log(err);
                                    return res.status(500).json({
                                        Message: "Error in Connecting to DB",
                                        status: false
                                    });
                                } else {
                                    serviceProviderName = serviceProvider.name;
                                    serviceProviderPicture = serviceProvider.picture_profile;

                                    let finalResult = [];
                                    for (let i = 0; i < result.length; i++) {
                                        finalResult[i] = result[i].toObject();
                                        finalResult[i].customerName = customerName;
                                        finalResult[i].customerEmail = customerEmail;
                                        finalResult[i].customerPicture = customerPicture;
                                        finalResult[i].serviceProviderName = serviceProviderName;
                                        finalResult[i].serviceProviderEmail = serviceProviderEmail;
                                        finalResult[i].serviceProviderPicture = serviceProviderPicture;
                                    }
                                    return res.json(finalResult);
                                }

                            });
                        }
                    });

                }
            });
        }

    });

});


//Add booking Details
router.post('/add_bookingDetails', function (req, res) {
    var bookingDetailsform = req.body;
    bookingDetails.addBookingDetails(bookingDetailsform, function (err, bookingDetails) 
    {
        if (err) 
        {
            return res.status(500).json({
                Message: "Error in Connecting to DB",
                status: false
            });
        } 
        else 
        {
            console.log(bookingDetails.serviceProviderEmail)
            serviceProvider.getServiceProviderByEmail(bookingDetails.serviceProviderEmail,function(err,serviceProvider)
            {
                if(err)
                {
                    return res.status(500).json({
                        Message: "Error in Connecting to DB",
                        status: false
                    });
                }
                else  {

                    let token = serviceProvider.token;
                    
                    let body = "Booking Request of: " + bookingDetails.bookingType + " on: " + bookingDetails.date;
    
                    
                    functions.notification("New Booking Notification",body,token)
    
                }
                var result = bookingDetails.toObject();
                result.status = true;
                return res.json(result);
            });

            
        }
    });


});



// Update Booking Status
router.patch('/update_bookingState/:id', function(req,res)
{
    let id=req.params.id;
    let state=req.body.state;
    console.log(state);
    bookingDetails.updateBookingState(id,state,function(err,bookingDetails)
    {
        if(err)
        {
            return res.status(500).json({
                Message: "Error in Connecting to DB",
                status: false
            });
        }
        else
        {
            customer.getCustomerByEmail(bookingDetails.customerEmail,function(err,customer)
            {
                if(err)
                {
                    return res.status(500).json({
                        Message: "Error in Connecting to DB",
                        status: false
                    });
                }
                else
                {
                    let token=customer.token;
                    
                    if(state=="accepted")
                    {
                        let body = "Booking Request of: " + bookingDetails.bookingType + " on: " + bookingDetails.date;
                        functions.notification("Booking Accepted",body,token)
                    }
                    else if(state==("completed"))
                    {
                        let body = "Booking Request of: " + bookingDetails.bookingType + " on: " + bookingDetails.date;
                        functions.notification("Booking Completed",body,token)
                    }
                    else if(state==("canceled"))
                    {
                        let body = "Booking Request of: " + bookingDetails.bookingType + " on: " + bookingDetails.date;
                        functions.notification("Booking Cancelled",body,token)
                    }
                    
                    res.json(
                        {
                            status: "success",
                            message: "State Changed"
                        });
                }
            })
        }
    })
});



module.exports = router;
