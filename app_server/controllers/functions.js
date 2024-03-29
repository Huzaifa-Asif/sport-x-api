const cloudinary = require('cloudinary');
var customer =require('../models/customer.js');
var customerController = require('../controllers/customer.js');
var serviceProviderController = require('../controllers/serviceProvider.js');
var emailAccount =require('../../emails/account.js');
var serviceProvider=require('../models/serviceProvider.js');
var admin = require('firebase-admin');
var serviceAccount = require("../firebaseadmin.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://sport-x-a7672.firebaseio.com"
  });




module.exports.uploadPicture= async (base64) =>
{
    var uploadString="data:image/png;base64,"+base64;
    try
    {
        imgUrl = await cloudinary.uploader.upload(uploadString, {folder: "user_images/"}, function(result){
        return result.url;
        });
    }
    catch(error)
    {
        console.log(error);
        throw error;
    }
        
    return imgUrl;

} 

// Login
module.exports.login = (email,password,res) => {
    let record=new customer();
    customer.findOne({email:email}).
    exec(function(err,result)
    {
        if (err)
		{
			return res.status(500).json({Message:"Error in Connecting to DB",status:false});
		}
        else if(result)
        {
            if(result.state==='blocked')
            {
                return res.status(500).json({Message:"You Are Currently Blocked in our system. Kindly contact our supoort team.",status:false});
            }
            else if(record.comparePassword(password,result.password))
            {
                var result1 = result.toObject();
                result1.status = true;
                return res.json(result1);
            }
            else
			{
				return res.status(500).json({Message:"Wrong Password",status:false});
			}

        }
        else
        {
            let record=new serviceProvider();
            serviceProvider.findOne({email:email}).
            exec(function(err,result)
            {
                if (err)
                {
                    return res.status(500).json({Message:"Error in Connecting to DB",status:false});
                }
                else if(result)
                {
                    if(result.state==='blocked')
                    {
                        return res.status(500).json({Message:"You Are Currently Blocked in our system. Kindly contact our supoort team.",status:false});
                    }
                    else if(result.state==='pending')
                    {
                        return res.status(500).json({Message:"Kindly wait for Admin Approval.",status:false});
                    }
                    else if(record.comparePassword(password,result.password))
                    {
                        var result1 = result.toObject();
                        result1.status = true;
                        return res.json(result1);
                    }
                    else
                    {
                        return res.status(500).json({Message:"Wrong Password",status:false});
                    }
        
                }
                else
                {
                    return res.status(500).json({Message:"Wrong Email",status:false});
                }
        
            });
        
        }
    });
}


// Reset Password
module.exports.reset = (email,res) => {
    let record=new customer();
    customer.findOne({email:email}).
    where('state').equals('approved').
    exec(function(err,result)
    {
        if (err)
		{
			return res.status(500).json({Message:"Error in Connecting to DB",status:false});
		}
        else if(result)
        {
            let password = Math.random() * (1000000 - 100000) + 100000;
            password = Math.ceil(password);
            console.log(password);
            
            let customerform = {
                password : password
            }

            customerController.updateCustomer(email, customerform, {
                new: true
            }, function (err, customer) {
                if (err) {
                    return res.status(500).json({
                        Message: "Error in Connecting to DB",
                        status: false
                    });
                }
                else if(customer){
                    emailAccount.sendEmail(email,password)
                    return res.json({Message:"Password Updated, Kindly Check Email",status:true});
                }
        
            });
            
            
        }
        else
        {
            let record=new serviceProvider();
            serviceProvider.findOne({email:email}).
            where('state').equals('approved').
            exec(function(err,result)
            {
                if (err)
                {
                    return res.status(500).json({Message:"Error in Connecting to DB",status:false});
                }
                else if(result)
                {

                    let password = Math.random() * (1000000 - 100000) + 100000;
                    password = Math.ceil(password);
                    console.log(password);
                    
                    let serviceProviderform = {
                        password : password
                    }
        
                    serviceProviderController.updateServiceProvider(email, serviceProviderform, {
                        new: true
                    }, function (err, serviceProvider) {
                        if (err) {
                            return res.status(500).json({
                                Message: "Error in Connecting to DB",
                                status: false
                            });
                        }
                        else if(serviceProvider){
                            emailAccount.sendEmail(email,password)
                            return res.json({Message:"Password Updated, Kindly Check Email",status:true});
                        }
                
                    });
                    
                    
        
                }
                else
                {
                    return res.status(500).json({Message:"Wrong Email",status:false});
                }
        
            });
        
        }
    });
}


module.exports.notification = (title, body, token) => {
    
   // This registration token comes from the client FCM SDKs.
var registrationToken = token;
if(!token)
{
    return;
}
var message = {
    data: {
        title: title,
        body: body
        },
        token: registrationToken
        
};

// Send a message to the device corresponding to the provided
// registration token.
admin.messaging().send(message)
  .then((response) => {
    // Response is a message ID string.
    console.log('Successfully sent message:', response);
  })
  .catch((error) => {
    console.log('Error sending message:', error);
  });

}

//Send Notification to all customers
module.exports.sendNotificationToAllCustomers=(title,body)=>
{
    customerController.getCustomer(function (err,result)
    {
        if(err)
        {
            console.log(err)
        }
        else
        {
            for(let i=0;i<result.length;i++)
            {
                const token=result[i].token;
                if(token)
                {
                    exports.notification(title,body,token)
                }
                
            }
        }
    })
}
