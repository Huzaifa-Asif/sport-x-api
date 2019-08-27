const mongoose = require('mongoose');

const schema = mongoose.Schema;

// Rating And Feedback Schema

const ratingAndFeedbackSchema = new schema({
    rating:{
        type:Number
    },
    feedback:{
        type:String
    },
    date:{
        type:String
    },
    serviceProviderEmail:{
        type:String
    },
    serviceProviderName:{
        type:String
    },
    customerEmail:{
        type:String
    },
    jobId:{
        type:String
    }
})


const ratingAndFeedback= module.exports = mongoose.model('RatingAndFeedback',ratingAndFeedbackSchema);