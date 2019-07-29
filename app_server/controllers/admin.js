var admin=require('../models/admin.js');


// Get Admins
module.exports.getAdmin = (callback, limit) => {
	admin.find(callback).limit(limit);
}

// Login
module.exports.login = (email,password,res) => {
    var record=new admin();
    admin.findOne({email:email},function(err,result)
    {
        if(err)
        return res.status(500).json({Message:"Error in Connecting to DB",status:false});
        else if(result)
        {
            console.log(result.password);
            if(record.comparePassword(password,result.password))
            {
                var result1 = result.toObject();
                result1.status = true;
                return res.json(result1);
            }
            else
            return res.status(500).json({Message:"Wrong Email or Password",status:false});
        
        }
        else
        return res.status(500).json({Message:"Wrong Email or Password",status:false});
    });
}

// Get Admin By Id
module.exports.getAdminById = (id ,callback) =>  {
	admin.findById(id, callback);
}

// Add Admin 
module.exports.addAdmin = (adminform ,callback) =>  {
    record=new admin();
    record.email=adminform.email;
    record.password=record.hashPassword(adminform.password);
    record.save(callback);
}

// Update Admin 
module.exports.updateAdmin = (id, adminform, options, callback) => {
    var query = {admin_id: id};
    var update = {

        email: adminform.email,
        password:adminform.password
        

    }

    admin.findOneAndUpdate(query, update, options, callback);
}

// Delete Admin   
module.exports.removeAdmin = (id, callback) => {
    var query = {admin_id: id};
    admin.remove(query, callback);
}