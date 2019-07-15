var revenue =require('../models/revenue.js');

// Get revenue
module.exports.getRevenue = (callback, limit) => {
	revenue.find(callback).limit(limit);
}

// Get revenue By ID
module.exports.getRevenueById = (id ,callback) =>  {
	revenue.findById(id, callback);
}

// Add revenue
module.exports.addRevenue = (revenueform, callback) => {
	revenue.create(revenueform, callback);
}

// Update revenue
module.exports.updateRevenue = (id, revenueform, options, callback) => {
    var query = {_id: id};
    var update = {

        revenueCategory: revenueform.revenueCategory,
        amount: revenueform.amount,
        serviceProviderId: revenueform.serviceProviderId,
        customerId:revenueform.customerId,
        date: revenueform.date
        
        
    }

    revenue.findOneAndUpdate(query, update, options, callback);
}

// Delete revenue
module.exports.removeRevenue = (id, callback) => {
    var query = {_id: id};
    revenue.remove(query, callback);
}