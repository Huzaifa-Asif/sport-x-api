var customer =require('../models/customer.js');
var functions =require('../controllers/functions.js');



// Get Customer
module.exports.getCustomer = (callback, limit) => {
	customer.find(callback).limit(limit);
}

// Check email exists
module.exports.checkCustomerEmail = (email,callback) => {
	customer.findOne({email:email},callback);
}
// Login
module.exports.login = (email,password,res) => {
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
            if(record.comparePassword(password,result.password))
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

// Get Customer By ID
module.exports.getCustomerById = (id ,callback) =>  {
	customer.findById(id, callback);
}

// Get Customer By Email
module.exports.getCustomerByEmail = (email ,callback) =>  {
	customer.findOne({email:email}, callback);
}

// Add Customer
module.exports.addCustomer = async (customerform, callback) => {
    let record=new customer();
    record.name=customerform.name;
    record.contact=customerform.contact;
    record.email=customerform.email;
    record.password=record.hashPassword(customerform.password);

    if(customerform.picture)
    {
        try
        {
            imgUrl=await functions.uploadPicture(customerform.picture);
        }
        catch(error)
        {
            console.log(error);
            throw error;
        }
        //urlImage = JSON(imgUrl.url);
        record.picture=imgUrl.url;
    }
    else{
        record.picture="";
    }
    
    if(!customerform.email)
    {
        record.email="";
    }
    if(!customerform.contact)
    {
        record.contact="";
    }

    if(!customerform.name)
    {
        record.name="";
    }
    if(!customerform.token)
    {
        record.token="";
    }

    record.save(callback);
}

// Update Customer
module.exports.updateCustomer = async (email, customerform, options, callback) => {
    var query = {email: email};
    let record=new customer();
    if(customerform.password)
    {
        customerform.password=record.hashPassword(customerform.password);
    }
    if(customerform.picture)
    {
        try
        {
            imgUrl=await functions.uploadPicture(customerform.picture);
        }
        catch(error)
        {
            console.log(error);
            throw error;
        }
        //urlImage = JSON(imgUrl.url);
        customerform.picture=imgUrl.url;
    }
    
   
    customer.findOneAndUpdate(query, customerform, options, callback);
}

// Delete Customer
module.exports.removeCustomer = (id, callback) => {
    var query = {_id: id};
    customer.remove(query, callback);
}
