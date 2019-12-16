var express = require('express');
var router = express.Router();


var bookingDetails = require('../controllers/bookingDetails.js');
var functions = require('../controllers/functions.js');
var serviceProvider = require('../controllers/serviceProvider.js');
var customer = require('../controllers/customer.js');

const excel = require('node-excel-export');

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
    bookingDetails.updateBookingState(id,state,function(err,bookingDetailsResult)
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

            customer.getCustomerByEmail(bookingDetailsResult.customerEmail,function(err,customer)
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
                        let body = "Booking Request of: " + bookingDetailsResult.bookingType + " on: " + bookingDetailsResult.date;
                        functions.notification("Booking Accepted",body,token)
                    }
                    else if(state==("completed"))
                    {
                        let body = "Booking Request of: " + bookingDetailsResult.bookingType + " on: " + bookingDetailsResult.date;
                        functions.notification("Booking Completed",body,token)
                        bookingDetails.addRevenueForCompletedBooking(id)
                    }
                    else if(state==("canceled"))
                    {
                        let body = "Booking Request of: " + bookingDetailsResult.bookingType + " on: " + bookingDetailsResult.date;
                        functions.notification("Booking Cancelled",body,token)
                    }
                    
                    return res.json(
                        {
                            status: "success",
                            message: "State Changed"
                        });
                }
            })
        }
    })
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




// // Pending Bookings of Vendor
// router.get('/serviceProviderPendingBookings/:email', bookingDetails.serviceProviderPendingBookings);

// Pending Bookings of Service Provider
router.get('/serviceProviderPendingBookings/:email', function(req,res)
{
    bookingDetails.serviceProviderPendingBookings(req.params.email,async function(err,result)
    {
        if(err)
        {
            console.log(err);
            return res.status(500).json({
                Message: "Error in Connecting to DB",
                status: false
            });
        }
        else if(result)
        {
            let finalResult=[];
            for(let i=0;i<result.length;i++)
            {
                finalResult[i]=result[i].toObject();
                let customerDetails=await customer.getCustomerByEmailSync(result[i].customerEmail).catch(err=>
                    {
                        console.log(err);
                        return res.status(500).json({
                        Message: "Error in Connecting to DB",
                        status: false
                        });
                    });
                let serviceProviderDetails= await serviceProvider.getServiceProviderByEmailSync(result[i].serviceProviderEmail).catch(err=>
                    {
                        console.log(err);
                        return res.status(500).json({
                        Message: "Error in Connecting to DB",
                        status: false
                        });
                    });
                finalResult[i].customerName=customerDetails.name;
                finalResult[i].customerNumber=customerDetails.contact;
                finalResult[i].serviceProviderName=serviceProviderDetails.name;
                finalResult[i].serviceProviderNumber=serviceProviderDetails.contact;
            }
            
            return res.json(finalResult);
        }
    });
        
});


// // In Progress Bookings of Vendor
// router.get('/serviceProviderInProgressBookings/:email', bookingDetails.serviceProviderInProgressBookings);

// In Progress Bookings of Service Provider
router.get('/serviceProviderInProgressBookings/:email', function(req,res)
{
    bookingDetails.serviceProviderInProgressBookings(req.params.email,async function(err,result)
    {
        if(err)
        {
            console.log(err);
            return res.status(500).json({
                Message: "Error in Connecting to DB",
                status: false
            });
        }
        else if(result)
        {
            let finalResult=[];
            for(let i=0;i<result.length;i++)
            {
                finalResult[i]=result[i].toObject();
                let customerDetails=await customer.getCustomerByEmailSync(result[i].customerEmail).catch(err=>
                    {
                        console.log(err);
                        return res.status(500).json({
                        Message: "Error in Connecting to DB",
                        status: false
                        });
                    });
                let serviceProviderDetails= await serviceProvider.getServiceProviderByEmailSync(result[i].serviceProviderEmail).catch(err=>
                    {
                        console.log(err);
                        return res.status(500).json({
                        Message: "Error in Connecting to DB",
                        status: false
                        });
                    });
                finalResult[i].customerName=customerDetails.name;
                finalResult[i].customerNumber=customerDetails.contact;
                finalResult[i].serviceProviderName=serviceProviderDetails.name;
                finalResult[i].serviceProviderNumber=serviceProviderDetails.contact;
            }
            
            return res.json(finalResult);
        }
    });
        
});

// // Completed Bookings of Vendor
// router.get('/serviceProviderCompletedBookings/:email', bookingDetails.serviceProviderCompletedBookings);


// Completed Bookings of Service Provider
router.get('/serviceProviderCompletedBookings/:email', function(req,res)
{
    bookingDetails.serviceProviderCompletedBookings(req.params.email,async function(err,result)
    {
        if(err)
        {
            console.log(err);
            return res.status(500).json({
                Message: "Error in Connecting to DB",
                status: false
            });
        }
        else if(result)
        {
            let finalResult=[];
            for(let i=0;i<result.length;i++)
            {
                finalResult[i]=result[i].toObject();
                let customerDetails=await customer.getCustomerByEmailSync(result[i].customerEmail).catch(err=>
                    {
                        console.log(err);
                        return res.status(500).json({
                        Message: "Error in Connecting to DB",
                        status: false
                        });
                    });
                let serviceProviderDetails= await serviceProvider.getServiceProviderByEmailSync(result[i].serviceProviderEmail).catch(err=>
                    {
                        console.log(err);
                        return res.status(500).json({
                        Message: "Error in Connecting to DB",
                        status: false
                        });
                    });
                finalResult[i].customerName=customerDetails.name;
                finalResult[i].customerNumber=customerDetails.contact;
                finalResult[i].serviceProviderName=serviceProviderDetails.name;
                finalResult[i].serviceProviderNumber=serviceProviderDetails.contact;
            }
            
            return res.json(finalResult);
        }
    });
        
});

// // Pending Bookings of Customer
// router.get('/customerPendingBookings/:email', bookingDetails.customerPendingBookings);

// Pending Bookings of Customer
router.get('/customerPendingBookings/:email', function(req,res)
{
    bookingDetails.customerPendingBookings(req.params.email,async function(err,result)
    {
        if(err)
        {
            console.log(err);
            return res.status(500).json({
                Message: "Error in Connecting to DB",
                status: false
            });
        }
        else if(result)
        {
            let finalResult=[];
            for(let i=0;i<result.length;i++)
            {
                finalResult[i]=result[i].toObject();
                let customerDetails=await customer.getCustomerByEmailSync(result[i].customerEmail).catch(err=>
                    {
                        console.log(err);
                        return res.status(500).json({
                        Message: "Error in Connecting to DB",
                        status: false
                        });
                    });
                let serviceProviderDetails= await serviceProvider.getServiceProviderByEmailSync(result[i].serviceProviderEmail).catch(err=>
                    {
                        console.log(err);
                        return res.status(500).json({
                        Message: "Error in Connecting to DB",
                        status: false
                        });
                    });
                finalResult[i].customerName=customerDetails.name;
                finalResult[i].customerNumber=customerDetails.contact;
                finalResult[i].serviceProviderName=serviceProviderDetails.name;
                finalResult[i].serviceProviderNumber=serviceProviderDetails.contact;
            }
            
            return res.json(finalResult);
        }
    });
        
});


// // In Progress Bookings of Customer
// router.get('/customerInProgressBookings/:email', bookingDetails.customerInProgressBookings);

// In Progress Bookings of Customer
router.get('/customerInProgressBookings/:email', function(req,res)
{
    bookingDetails.customerInProgressBookings(req.params.email,async function(err,result)
    {
        if(err)
        {
            console.log(err);
            return res.status(500).json({
                Message: "Error in Connecting to DB",
                status: false
            });
        }
        else if(result)
        {
            let finalResult=[];
            for(let i=0;i<result.length;i++)
            {
                finalResult[i]=result[i].toObject();
                let customerDetails=await customer.getCustomerByEmailSync(result[i].customerEmail).catch(err=>
                    {
                        console.log(err);
                        return res.status(500).json({
                        Message: "Error in Connecting to DB",
                        status: false
                        });
                    });
                let serviceProviderDetails= await serviceProvider.getServiceProviderByEmailSync(result[i].serviceProviderEmail).catch(err=>
                    {
                        console.log(err);
                        return res.status(500).json({
                        Message: "Error in Connecting to DB",
                        status: false
                        });
                    });
                finalResult[i].customerName=customerDetails.name;
                finalResult[i].customerNumber=customerDetails.contact;
                finalResult[i].serviceProviderName=serviceProviderDetails.name;
                finalResult[i].serviceProviderNumber=serviceProviderDetails.contact;
            }
            
            return res.json(finalResult);
        }
    });
        
});


// // Completed Bookings of Customer
// router.get('/customerCompletedBookings/:email', bookingDetails.customerCompletedBookings);


// Completed Bookings of Customer
router.get('/customerCompletedBookings/:email', function(req,res)
{
    bookingDetails.customerCompletedBookings(req.params.email,async function(err,result)
    {
        if(err)
        {
            console.log(err);
            return res.status(500).json({
                Message: "Error in Connecting to DB",
                status: false
            });
        }
        else if(result)
        {
            let finalResult=[];
            for(let i=0;i<result.length;i++)
            {
                finalResult[i]=result[i].toObject();
                let customerDetails=await customer.getCustomerByEmailSync(result[i].customerEmail).catch(err=>
                    {
                        console.log(err);
                        return res.status(500).json({
                        Message: "Error in Connecting to DB",
                        status: false
                        });
                    });
                let serviceProviderDetails= await serviceProvider.getServiceProviderByEmailSync(result[i].serviceProviderEmail).catch(err=>
                    {
                        console.log(err);
                        return res.status(500).json({
                        Message: "Error in Connecting to DB",
                        status: false
                        });
                    });
                finalResult[i].customerName=customerDetails.name;
                finalResult[i].customerNumber=customerDetails.contact;
                finalResult[i].serviceProviderName=serviceProviderDetails.name;
                finalResult[i].serviceProviderNumber=serviceProviderDetails.contact;
            }
            
            return res.json(finalResult);
        }
    });
        
});



// Get All the Booking
router.get('/get_booking', function (req, res) {
    bookingDetails.getBookingDetails(async function (err, result) {
        if (err)
            return res.status(500).json({
                Message: "Error in Connecting to DB",
                status: false
            });
            else if(result)
            {
                let finalResult=[];
            for(let i=0;i<result.length;i++)
            {
                finalResult[i]=result[i].toObject();
                let customerDetails=await customer.getCustomerByEmailSync(result[i].customerEmail).catch(err=>
                    {
                        console.log(err);
                        return res.status(500).json({
                        Message: "Error in Connecting to DB",
                        status: false
                        });
                    });
                let serviceProviderDetails= await serviceProvider.getServiceProviderByEmailSync(result[i].serviceProviderEmail).catch(err=>
                    {
                        console.log(err);
                        return res.status(500).json({
                        Message: "Error in Connecting to DB",
                        status: false
                        });
                    });
                finalResult[i].customerName=customerDetails.name;
                finalResult[i].customerNumber=customerDetails.contact;
                finalResult[i].serviceProviderName=serviceProviderDetails.name;
                finalResult[i].serviceProviderNumber=serviceProviderDetails.contact;
            }
            
            return res.json(finalResult);
            }

        

    });

});


// Get Booking Details by Email - Service Provider
router.get('/get_bookingdetails/:email', function (req, res) {
    bookingDetails.getBookingDetailsByEmail(req.params.email, async function (err, result) {
        if (err)
            return res.status(500).json({
                Message: "Error in Connecting to DB",
                status: false
            });

            else if(result)
            {
                let finalResult=[];
            for(let i=0;i<result.length;i++)
            {
                finalResult[i]=result[i].toObject();
                let customerDetails=await customer.getCustomerByEmailSync(result[i].customerEmail).catch(err=>
                    {
                        console.log(err);
                        return res.status(500).json({
                        Message: "Error in Connecting to DB",
                        status: false
                        });
                    });
                let serviceProviderDetails= await serviceProvider.getServiceProviderByEmailSync(result[i].serviceProviderEmail).catch(err=>
                    {
                        console.log(err);
                        return res.status(500).json({
                        Message: "Error in Connecting to DB",
                        status: false
                        });
                    });
                finalResult[i].customerName=customerDetails.name;
                finalResult[i].customerNumber=customerDetails.contact;
                finalResult[i].serviceProviderName=serviceProviderDetails.name;
                finalResult[i].serviceProviderNumber=serviceProviderDetails.contact;
            }
            
            return res.json(finalResult);
            }

    });

});

// Get Booking Details by Email - Customer
router.get('/get_customerBookingdetails/:email', function (req, res) {
    bookingDetails.getCustomerBookingDetailsByEmail(req.params.email, async function (err, result) {
        if (err)
            return res.status(500).json({
                Message: "Error in Connecting to DB",
                status: false
            });

            else if(result)
            {
                let finalResult=[];
            for(let i=0;i<result.length;i++)
            {
                finalResult[i]=result[i].toObject();
                let customerDetails=await customer.getCustomerByEmailSync(result[i].customerEmail).catch(err=>
                    {
                        console.log(err);
                        return res.status(500).json({
                        Message: "Error in Connecting to DB",
                        status: false
                        });
                    });
                let serviceProviderDetails= await serviceProvider.getServiceProviderByEmailSync(result[i].serviceProviderEmail).catch(err=>
                    {
                        console.log(err);
                        return res.status(500).json({
                        Message: "Error in Connecting to DB",
                        status: false
                        });
                    });
                finalResult[i].customerName=customerDetails.name;
                finalResult[i].customerNumber=customerDetails.contact;
                finalResult[i].serviceProviderName=serviceProviderDetails.name;
                finalResult[i].serviceProviderNumber=serviceProviderDetails.contact;
            }
            
            return res.json(finalResult);
            }

    });

});

// Get Booking Details by Date and Email
router.get('/get_bookingdetails_by_date/', function (req, res) {
    bookingDetails.getBookingDetailsByDate(req.query.date,req.query.email, async function (err, result) {
        if (err)
            return res.status(500).json({
                Message: "Error in Connecting to DB",
                status: false
            });

            else if(result)
            {
                let finalResult=[];
            for(let i=0;i<result.length;i++)
            {
                finalResult[i]=result[i].toObject();
                let customerDetails=await customer.getCustomerByEmailSync(result[i].customerEmail).catch(err=>
                    {
                        console.log(err);
                        return res.status(500).json({
                        Message: "Error in Connecting to DB",
                        status: false
                        });
                    });
                let serviceProviderDetails= await serviceProvider.getServiceProviderByEmailSync(result[i].serviceProviderEmail).catch(err=>
                    {
                        console.log(err);
                        return res.status(500).json({
                        Message: "Error in Connecting to DB",
                        status: false
                        });
                    });
                finalResult[i].customerName=customerDetails.name;
                finalResult[i].customerNumber=customerDetails.contact;
                finalResult[i].serviceProviderName=serviceProviderDetails.name;
                finalResult[i].serviceProviderNumber=serviceProviderDetails.contact;
            }
            
            return res.json(finalResult);
            }

    });

});


// Get Booking Details by Booking Id 
router.get('/get_bookingDetailById/:id', function (req, res) {
    bookingDetails.getBookingDetailsById(req.params.id, function (err, result) {
        if (err)
            return res.status(500).json({
                Message: "Error in Connecting to DB",
                status: false
            });

            else if(result)
            {
                let finalResult;
            
                finalResult=result.toObject();
                let customerDetails=await customer.getCustomerByEmailSync(result.customerEmail).catch(err=>
                    {
                        console.log(err);
                        return res.status(500).json({
                        Message: "Error in Connecting to DB",
                        status: false
                        });
                    });
                let serviceProviderDetails= await serviceProvider.getServiceProviderByEmailSync(result.serviceProviderEmail).catch(err=>
                    {
                        console.log(err);
                        return res.status(500).json({
                        Message: "Error in Connecting to DB",
                        status: false
                        });
                    });
                finalResult.customerName=customerDetails.name;
                finalResult.customerNumber=customerDetails.contact;
                finalResult.serviceProviderName=serviceProviderDetails.name;
                finalResult.serviceProviderNumber=serviceProviderDetails.contact;
            
            
            return res.json(finalResult);
            }

    });

});




// You can define styles as json object
const styles = {
    headerDark: {
      fill: {
        fgColor: {
          rgb: '95B22D'
        }
      },
      font: {
        color: {
          rgb: 'FFFFFFFF'
        },
        sz: 18,
        bold: true,
        underline: true
      }
    },
    headerYellow: {
        fill: {
          fgColor: {
            rgb: 'F7B310'
          }
        },
        font: {
          color: {
            rgb: 'FFFFFFFF'
          },
          sz: 14,
          bold: true,
          underline: true
        }
      },
    cellPink: {
      fill: {
        fgColor: {
          rgb: 'FFFFCCFF'
        }
      }
    },
    cellGreen: {
      fill: {
        fgColor: {
          rgb: '5BC137'
        }
      }
    }
  };

  const heading = [
    [{value: 'SPORT-X - Booking Details', style: styles.headerDark}, {value: 'b1', style: styles.headerDark}, {value: 'c1', style: styles.headerDark}],
    ['All the Booking Details of the system are listed below, the completed bookings are green,  Pending and In-Progress bookings are yellow', 'b2', 'c2'] // <-- It can be only values
  ];

  //Here you specify the export structure
const specification = {
    state: { // <- the key should match the actual data key
        displayName: 'Booking State', // <- Here you specify the column header
        headerStyle: styles.headerYellow, // <- Header style
        cellStyle: function(value, row) { // <- style renderer function
  
          return (row.state == "completed") ? styles.cellGreen : {fill: {fgColor: {rgb: 'F3D800'}}}; // <- Inline cell style is possible 
        },
        width: 140 // <- width in pixels
      },
      paymentStatus: { // <- the key should match the actual data key
      displayName: 'Payment Status', // <- Here you specify the column header
      headerStyle: styles.headerYellow, // <- Header style
      width: 140 // <- width in pixels
    },
    price: {
        displayName: 'Booking Price (PKR)',
        headerStyle: styles.headerYellow,
        width: 170 // <- width in chars (when the number is passed as string)
    },
    bookingType: {
        displayName: 'Booking Type',
        headerStyle: styles.headerYellow,
        width: 140 // <- width in chars (when the number is passed as string)
    },
    date: {
      displayName: 'Booking Date',
      headerStyle: styles.headerYellow,
      width: 140 // <- width in chars (when the number is passed as string)
    },
    time: {
        displayName: 'Booking Time',
        headerStyle: styles.headerYellow,
        width: 140 // <- width in chars (when the number is passed as string)
      },
    serviceProviderName: {
        displayName: 'Service Provider Name',
        headerStyle: styles.headerYellow,
        width: 190 // <- width in chars (when the number is passed as string)
      },

    serviceProviderNumber: {
        displayName: 'Service Provider Number',
        headerStyle: styles.headerYellow,
        width: 190 // <- width in chars (when the number is passed as string)
      },
    serviceProviderEmail: {
        displayName: 'Service Provider Email',
        headerStyle: styles.headerYellow,
        width: 190 // <- width in chars (when the number is passed as string)
      },

    customerName: {
        displayName: 'Customer Name',
        headerStyle: styles.headerYellow,
        width: 140 // <- width in chars (when the number is passed as string)
      },

    customerNumber: {
        displayName: 'Customer Number',
        headerStyle: styles.headerYellow,
        width: 140 // <- width in chars (when the number is passed as string)
      },
    customerEmail: {
        displayName: 'Customer Eamil',
        headerStyle: styles.headerYellow,
        width: 140 // <- width in chars (when the number is passed as string)
      },
     

  }

// Define an array of merges. 1-1 = A:1
// The merges are independent of the data.
// A merge will overwrite all data _not_ in the top-left cell.
const merges = [
    { start: { row: 1, column: 1 }, end: { row: 1, column: 5 } },
    { start: { row: 2, column: 1 }, end: { row: 2, column: 6 } }

  ]


// Export jobApplication by JobPostId
router.get('/getBookingReport', function (req, res) {
    bookingDetails.getBookingDetails( async function (err, bookingReport) {
        if (err) {
            return res.status(500).json({
                Message: "Error in Connecting to DB",
                status: false
            });
        } else if (bookingReport) {
          //Array of objects representing heading rows (very top)
    
          let finalResult=[];
          let customers=[];
          let serviceProviders=[];
          let customerFilter=[],serviceProviderFilter=[];
          let customerDetails,serviceProviderDetails;
          for(let i=0;i<bookingReport.length;i++)
          {
              finalResult[i]=bookingReport[i].toObject();
              
              customerFilter=customers.filter(customer => (customer.email === (bookingReport[i].customerEmail)));
              if(customerFilter.length<1)
              {
                    customerDetails=await customer.getCustomerByEmailSync(bookingReport[i].customerEmail).catch(err=>
                    {
                        console.log(err);
                        return res.status(500).json({
                        Message: "Error in Connecting to DB",
                        status: false
                        });
                    });
                    customers.push(customerDetails);
              }
              else
              {
                  customerDetails=customerFilter[0];

              }

              serviceProviderFilter=serviceProviders.filter(serviceProvider => (serviceProvider.email === (bookingReport[i].serviceProviderEmail)));
              if(serviceProviderFilter.length<1)
              {
                    serviceProviderDetails= await serviceProvider.getServiceProviderByEmailSync(bookingReport[i].serviceProviderEmail).catch(err=>
                    {
                        console.log(err);
                        return res.status(500).json({
                        Message: "Error in Connecting to DB",
                        status: false
                        });
                    });
                    serviceProviders.push(serviceProviderDetails);
              }
              else
              {
                serviceProviderDetails=serviceProviderFilter[0];

              }
              
              
              
              finalResult[i].customerName=customerDetails.name;
              finalResult[i].customerNumber=customerDetails.contact;
              finalResult[i].serviceProviderName=serviceProviderDetails.name;
              finalResult[i].serviceProviderNumber=serviceProviderDetails.contact;
          }
    const dataset = finalResult;
           
              // Create the excel report.
  // This function will return Buffer
  const report = excel.buildExport(
    [ // <- Notice that this is an array. Pass multiple sheets to create multi sheet report
      {
        name: 'SportxBookingDetails', // <- Specify sheet name (optional)
        heading: heading, // <- Raw heading array (optional)
        merges: merges, // <- Merge cell ranges
        specification: specification, // <- Report specification
        data: dataset // <-- Report data
      }
    ]
  );

      // You can then return this straight
res.attachment('SportxBookingDetails.xlsx'); // This is sails.js specific (in general you need to set headers)
return res.send(report);
            


        } else {
            return res.status(500).json({
                Message: "No Job Application found",
                status: false
            });
        }
    });
       

});

module.exports = router;
