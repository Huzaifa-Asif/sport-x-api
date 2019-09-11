var revenue =require('../models/revenue.js');
var revenueCategory =require('../models/revenueCategory.js');
// Get revenue
module.exports.getRevenue = (callback, limit) => {
	revenue.find(callback).limit(limit);
}

// Get revenue By ID
module.exports.getRevenueById = (id ,callback) =>  {
	revenue.findById(id, callback);
}

// Get revenue By Service Provider
module.exports.getRevenueByServiceProvider = (email ,callback) =>  {
	revenue.find({serviceProviderEmail:email}).sort({date:-1}).exec(callback);
}

// // Add revenue
// module.exports.addRevenue = (revenueform, callback) => {
// 	revenue.create(revenueform, callback);
// }

// Add revenue
module.exports.addrevenue = async(req,res) => {
    var addrevenueForm=req.body;
    let category=addrevenueForm.revenueCategory,email=addrevenueForm.serviceProviderEmail;
    await revenueCategory.find({name:category,serviceProviderEmail:email}).then(result=>
        {
            if(result.length<1)
            {
                revenueCategory.create({name:category,serviceProviderEmail:email}).catch(err=>
                    {
                        console.log(err);
                        return res.status(500).json({Message:"Error in Connecting to DB",status:false}); 
                    });
            }

        }).catch(err=>
            {
                console.log(err);
                return res.status(500).json({Message:"Error in Connecting to DB",status:false});   
            });
    await revenue.create(addrevenueForm).then(revenue=>
        {
            var result = revenue.toObject();
            result.status = true;
            return res.json(result);
        }).catch(err=>
            {
                console.log(err);
                return res.status(500).json({Message:"Error in Connecting to DB",status:false});
            });
}


// Get Revenue By Category
module.exports.getRevenueByCategory = (email ,category,callback) =>  {
	revenue.find({serviceProviderEmail:email,revenueCategory:category}, callback);
}

// Update revenue
module.exports.updateRevenue = (id, revenueform, options, callback) => {
    var query = {_id: id};
    var update = {

        revenueCategory: revenueform.revenueCategory,
        amount: revenueform.amount,
        serviceProviderEmail: revenueform.serviceProviderEmail,
        customerEmail:revenueform.customerEmail,
        bookingId:revenueform.bookingId,
        date: revenueform.date
        
        
    }

    revenue.findOneAndUpdate(query, update, options, callback);
}

// Delete revenue
module.exports.removeRevenue = (id, callback) => {
    var query = {_id: id};
    revenue.remove(query, callback);
}


//Generate Revenue Report
module.exports.getRevenueReport=(email,start,end,callback)=>
{
    
    revenue.aggregate(
        [
            {
                $match:
                {'serviceProviderEmail': email,
                 'date':
                  { $gte: start,
                    $lte: end }
                 } },
           {
               
             $group : {
                _id : '$revenueCategory'  ,
                categoryRevenue: { $sum: '$amount' } ,
                
             }
           }
        ]
     ).exec(callback);
}