var express = require('express');
var router = express.Router();

//
var admin = require('../controllers/admin.js');
var booking = require('../controllers/booking.js');
var bookingDetails = require('../controllers/bookingDetails.js');
var conversation = require('../controllers/conversation.js');
var customer = require('../controllers/customer.js');
var expense = require('../controllers/expense.js');
var expenseCategory = require('../controllers/expenseCategory.js');
var ratingAndFeedback = require('../controllers/ratingAndFeedback.js');
var revenue = require('../controllers/revenue.js');
var revenueCategory = require('../controllers/revenueCategory.js');
var serviceCategory = require('../controllers/serviceCategory.js');
var serviceProvider = require('../controllers/serviceProvider.js');
var team = require('../controllers/team.js');
var tournament = require('../controllers/tournament.js');
var functions = require('../controllers/functions.js');
var functions = require('../controllers/functions.js');
var message = require('../controllers/message.js');


router.get('/', function (req, res) {
    res.json({
        message: "Welcome to Sport-X Backend"
    })
});


//Add Admin
router.post('/signup_Admin', function (req, res) {
    var adminform = req.body;
    admin.addAdmin(adminform, function (err, admin) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                Message: "Error in Connecting to DB",
                status: false
            });
        }
        var result = admin.toObject();
        result.status = true;
        return res.json(result);
    });

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

//Login for Admin
router.post('/loginAdmin', function (req, res) {
    let email = req.body.email;
    let password = req.body.password;
    admin.login(email, password, res);


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
            return res.json(serviceProviders);
        else
            return res.status(500).json({
                Message: "No service Providers found with Names like " + req.params.name,
                status: false
            });

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



// Get Service Category
router.get('/get_serviceCategory', function (req, res) {
    serviceCategory.getServiceCategory(function (err, result) {
        if (err)
            return res.status(500).json({
                Message: "Error in Connecting to DB",
                status: false
            });

        return res.json(result);

    });

});


//Add Service Category
router.post('/add_serviceCategory', function (req, res) {
    var serviceCategoryform = req.body;
    serviceCategory.getServiceCategoryByName(serviceCategoryform.name, function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                Message: "Error in Connecting to DB",
                status: false
            });
        } else if (result)
            return res.json({
                Message: "Service Category Already Exists",
                status: false
            });
        else {
            serviceCategory.addServiceCategory(serviceCategoryform, function (err, serviceCategory) {
                if (err)
                    return res.status(500).json({
                        Message: "Error in Connecting to DB",
                        status: false
                    });

                var result = serviceCategory.toObject();
                result.status = true;
                return res.json(result);

            });
        }
    });

});


//Update Service Category
router.patch('/update_serviceCategory/:name', function (req, res) {
    var serviceCategoryform = req.body;
    var name = req.params.name;
    serviceCategory.updateServiceCategory(name, serviceCategoryform, {
        new: true
    }, function (err, serviceCategory) {
        if (err)
            return res.status(500).json({
                Message: "Error in Connecting to DB",
                status: false
            });

        var result = serviceCategory.toObject();
        result.status = true;
        return res.json(result);
    });

});


//Delete Service Category
router.delete('/delete_serviceCategory/:name', function (req, res) {
    var name = req.params.name;
    serviceCategory.removeServiceCategory(name, function (err) {
        if (err)
            return res.status(500).json({
                Message: "Error in Connecting to DB",
                status: false
            });

        return res.json({
            status: true
        });
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


// Ratings
router.post('/post_rating', ratingAndFeedback.post_rating);

// Find Rating of a Job
router.get('/findRating/:id', ratingAndFeedback.findRating);


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
    team.removeTeam(id, function (err,result) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                Message: "Error in Connecting to DB",
                status: false
            });
        }
        else if(result)
        {
            return res.json({
                status: true
            });    
        }
        else{
        return res.json({
            status: false
        });
    }
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




// Create  Team Fixtures in Tournament
router.post('/create_fixtures_tournament', function (req, res) {
    var tournamentId = req.body.tournamentId;

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


//Add ExpenseCategory
router.post('/add_expenseCategory', function (req, res) {
    var addExpenseCategoryForm = req.body;
    expenseCategory.checkExpenseCategory(addExpenseCategoryForm.name, addExpenseCategoryForm.email, function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                Message: "Error in Connecting to DB",
                status: false
            });
        } else if (result) {
            return res.status(500).json({
                Message: "This category already Exists for this service provider",
                status: false
            });
        } else {
            expenseCategory.addExpenseCategory(addExpenseCategoryForm, function (err, category) {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        Message: "Error in Connecting to DB",
                        status: false
                    });
                }
                var result = category.toObject();
                result.status = true;
                return res.json(result);
            });
        }
    });

});

//Get ExpenseCategory by ServiceProvider
router.get('/get_expenseCategory_by_serviceProvider/:email', function (req, res) {
    expenseCategory.getExpenseCategoryByServiceProvider(req.params.email, function (err, result) {
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

//Delete expenseCategory
router.delete('/delete_expenseCategory/:id', function (req, res) {
    var id = req.params.id;
    expenseCategory.removeExpenseCategory(id, function (err) {
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

//Add RevenueCategory
router.post('/add_revenueCategory', function (req, res) {
    var addRevenueCategoryForm = req.body;
    revenueCategory.checkRevenueCategory(addRevenueCategoryForm.name, addRevenueCategoryForm.email, function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                Message: "Error in Connecting to DB",
                status: false
            });
        } else if (result) {
            return res.status(500).json({
                Message: "This category already Exists for this service provider",
                status: false
            });
        } else {
            revenueCategory.addRevenueCategory(addRevenueCategoryForm, function (err, category) {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        Message: "Error in Connecting to DB",
                        status: false
                    });
                }
                var result = category.toObject();
                result.status = true;
                return res.json(result);
            });
        }
    });



});

//Get RevenueCategory by ServiceProvider ff
router.get('/get_revenueCategory_by_serviceProvider/:email', function (req, res) {
    revenueCategory.getRevenueCategoryByServiceProvider(req.params.email, function (err, result) {
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

//Delete RevenueCategory
router.delete('/delete_revenueCategory/:id', function (req, res) {
    var id = req.params.id;
    revenueCategory.removeRevenueCategory(id, function (err) {
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


//Add Expense
router.post('/add_expense', function (req, res) {
    expense.addExpense(req, res);

});



//Get Expense by ServiceProvider.
router.get('/get_expense_by_serviceProvider/:email', function (req, res) {
    expense.getExpenseByServiceProvider(req.params.email, function (err, result) {
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

//Get Expense by Category
router.get('/get_expense_by_category', function (req, res) {
    expense.getExpenseByCategory(req.query.email, req.query.category, function (err, result) {
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


//Delete expense 
router.delete('/delete_expense/:id', function (req, res) {
    var id = req.params.id;
    expense.removeExpense(id, function (err) {
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

//Add Revenue
router.post('/add_revenue', function (req, res) {
    revenue.addrevenue(req, res);

});

//Get Revenue by ServiceProvider
router.get('/get_revenue_by_serviceProvider/:email', function (req, res) {
    revenue.getRevenueByServiceProvider(req.params.email, function (err, result) {
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

//Get Revenue by Category
router.get('/get_revenue_by_category', function (req, res) {
    revenue.getRevenueByCategory(req.query.email, req.query.category, function (err, result) {
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

//Delete Revenue
router.delete('/delete_revenue/:id', function (req, res) {
    var id = req.params.id;
    revenue.removeRevenue(id, function (err) {
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

//Add Conversation
router.post('/add_conversation', function (req, res) {
    var addConversationForm = req.body;
    conversation.checkConversation(addConversationForm.serviceProviderEmail, addConversationForm.customerEmail, function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                Message: "Error in Connecting to DB",
                status: false
            });
        } else if (result) {
            if (result.state == "archived") {
                conversation.setConversationState(result._id, {
                    state: "active"
                }, {
                    new: true
                }, function (err, conversation) {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({
                            Message: "Error in Connecting to DB",
                            status: false
                        });
                    }
                    var result = conversation.toObject();
                    result.status = true;
                    return res.json(result);
                });
            } else {
                result1 = result.toObject();
                result1.status = true;
                return res.json(result1);
            }
        } else {
            conversation.addConversation(addConversationForm, function (err, conversation) {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        Message: "Error in Connecting to DB",
                        status: false
                    });
                }
                var result = conversation.toObject();
                result.status = true;
                return res.json(result);
            });
        }
    });

});

//Get Conversation by id
router.get('/get_conversation_by_id/:id', function (req, res) {
    conversation.getConversationById(req.params.id, function (err, result) {
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


//Get Active Conversation by email
router.get('/get_conversation_by_email_active/:email', function (req, res) {
    conversation.getConversationByEmail(req, res, 'active');
});

//Get Archived Conversation by email
router.get('/get_conversation_by_email_archived/:email', function (req, res) {
    conversation.getConversationByEmail(req, res, 'archived');
});

//Set Conversation State
router.patch('/set_conversation_state/:id', function (req, res) {
    conversation.setConversationState(req, res);
});

//Send Message
router.post('/send_message', function (req, res) {
    message.sendMessage(req, res);
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


//Compare Service Providers
router.post('/compare', function (req, res) {
    serviceProvider.compareServiceProviders(req.body.email1,req.body.email2,req.body.location,req, res);
});




module.exports = router;
