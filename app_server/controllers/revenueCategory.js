var revenueCategory =require('../models/revenueCategory.js');

// Get revenueCategory
module.exports.getrevenueCategory = (callback, limit) => {
	revenueCategory.find(callback).limit(limit);
}

// Get revenue By ID
module.exports.getRevenueCategoryById = (id ,callback) =>  {
	revenueCategory.findById(id, callback);
}

// Add revenueCategory
module.exports.addRevenueCategory = (revenueCategoryform, callback) => {
	revenueCategory.create(revenueCategoryform, callback);
}

// Update revenueCategory
module.exports.updateRevenueCategory = (id, revenueCategoryform, options, callback) => {
    var query = {_id: id};
    var update = {
        name: revenueCategoryform.name,
        serviceProviderId: revenueCategoryform.serviceProviderId
    }

    revenueCategory.findOneAndUpdate(query, update, options, callback);
}

// Delete revenueCategory
module.exports.removerevenueCategory = (id, callback) => {
    var query = {_id: id};
    revenueCategory.remove(query, callback);
}