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



// Post Rating
module.exports.post_rating = (req, res) => {
    let rating = new ratingAndFeedback({
        rating: req.body.rating,
        feedback: req.body.feedback,
        date: req.body.date,
        serviceProviderEmail: req.body.serviceProviderEmail,
        serviceProviderName: req.body.serviceProviderName,
        customerEmail: req.body.customerEmail,
        jobId: req.body.jobId
    });

    rating.save((err) => {
        if(err) {
            res.json({
                status: "failed",
                message: "Rating Not Posted!"
            });
        }
        else {
            res.json({
                status: "success",
                message: "Rating Posted Successfully!"
            });
        }
    });
}

// find rating using job_Id
exports.findRating = (req, res) => {
    ratingAndFeedback.find({jobId: req.params.id}).then(result => res.json(result)).catch(err => {
        res.send("something went wrong!")
    })
}


//Find Total Ratings and Average Rating by service Provider email
exports.findAvgRating=async(email)=>
{
    let avg=0,total;
    await ratingAndFeedback.find({serviceProviderEmail:email})
    .exec()
    .then(result=>
        {
            total=result.length;
            for(let i=0;i<result.length;i++)
            {
                avg+=result[i].rating;
            }
            avg=avg/result.length;
        })
        .catch(err=> console.log(err))
    return avgRating={
            avg:avg,
            total:total
        }
}
