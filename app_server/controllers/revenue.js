var revenue =require('../models/revenue.js');

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
	revenue.find({serviceProviderEmail:email}, callback);
}

// Add revenue
module.exports.addRevenue = (revenueform, callback) => {
	revenue.create(revenueform, callback);
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