var customer =require('../models/customer.js');
var functions =require('../controllers/functions.js');
<<<<<<< HEAD

=======
const cloudinary = require('cloudinary');

var imgUrl = null;
var urlImage = null;

async function uploadImage(image){
    imgUrl = await cloudinary.uploader.upload(image, {folder: "user_images/"}, function(result){
        console.log(result.url);
        return result.url;
        });
    return imgUrl;
}
>>>>>>> 153f1072a795969b4e71564b7489c2c0d5892267

// Get Customer
module.exports.getCustomer = (callback, limit) => {
	customer.find(callback).limit(limit);
}

// Check email exists
module.exports.getCustomerByEmail = (email,callback) => {
	customer.findOne({email:email},callback);
}
// Login
module.exports.login = (email,password,res) => {
    let record=new customer();
    customer.findOne({email:email},function(err,result)
    {
        if (err)
				{
					return res.status(500).json({Message:"Error in Connecting to DB",status:false});
				}
        
        else if(result)
        {
            if(record.comparePassword(password,result.password))
                {
                    var result1 = result.toObject();
                    result1.status = true;
                    return res.json(result1);

                }
            else
						{
							return res.status(500).json({Message:"Wrong Email or Password",status:false});
						}

        }
    });
}

// Get Customer By ID
module.exports.getCustomerById = (id ,callback) =>  {
	customer.findById(id, callback);
}

// Add Customer
<<<<<<< HEAD
module.exports.addCustomer = (customerform, callback) => {
=======
module.exports.addCustomer = async (customerform, callback) => {
>>>>>>> 153f1072a795969b4e71564b7489c2c0d5892267
    let record=new customer();
    record.name=customerform.name;
    record.contact=customerform.contact;
    record.email=customerform.email;
    record.password=record.hashPassword(customerform.password);

    if(customerform.picture)
<<<<<<< HEAD
    record.picture=functions.uploadPicture(record.email,customerform.picture)
=======
    {
        await uploadImage(customerform.picture);
        urlImage = JSON.stringify(imgUrl.url);
        record.picture=urlImage;
    }
    else{
        record.picture="";
    }
    
>>>>>>> 153f1072a795969b4e71564b7489c2c0d5892267

    record.save(callback);
}

// Update Customer
<<<<<<< HEAD
module.exports.updateCustomer = (email, customerform, options, callback) => {
    var query = {email: email};
    if(customerform.picture)
    customerform.picture=functions.uploadPicture(email,customerform.picture);
=======
module.exports.updateCustomer = async (email, customerform, options, callback) => {
    var query = {email: email};
    if(customerform.picture)
    {
            await uploadImage(customerform.picture);
            urlImage = JSON.stringify(imgUrl.url);
            record.picture=urlImage;      
    }
    else
    {
        record.picture="";
    }
   
>>>>>>> 153f1072a795969b4e71564b7489c2c0d5892267
    customer.findOneAndUpdate(query, customerform, options, callback);
}

// Delete Customer
module.exports.removeCustomer = (id, callback) => {
    var query = {_id: id};
    customer.remove(query, callback);
}
