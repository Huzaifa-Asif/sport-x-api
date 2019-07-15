var ratingAndFeedback =require('../models/ratingAndFeedback.js');

// Get ratingAndFeedback
module.exports.getRatingAndFeedback = (callback, limit) => {
	ratingAndFeedback.find(callback).limit(limit);
}

// Get ratingAndFeedback By ID
module.exports.getRatingAndFeedbackById = (id ,callback) =>  {
	ratingAndFeedback.findById(id, callback);
}

// Add ratingAndFeedback
module.exports.addRatingAndFeedback = (ratingAndFeedbackform, callback) => {
	ratingAndFeedback.create(ratingAndFeedbackform, callback);
}

// Update ratingAndFeedback
module.exports.updateRatingAndFeedback = (id, ratingAndFeedbackform, options, callback) => {
    var query = {_id: id};
    var update = {
        rating:ratingAndFeedbackform.rating,
        feedback: ratingAndFeedbackform.feedback,
        date: ratingAndFeedbackform.date,
        serviceProviderId: ratingAndFeedbackform.serviceProviderId,
        customerId: ratingAndFeedbackform.customerId,
        
        
        
    }

    ratingAndFeedback.findOneAndUpdate(query, update, options, callback);
}

// Delete ratingAndFeedback   
module.exports.removeRatingAndFeedback = (id, callback) => {
    var query = {_id: id};
    ratingAndFeedback.remove(query, callback);
}