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
        type:Date
    },
    serviceProviderId:{
        type:String
    },
    customerId:{
        type:String
    }
})


const ratingAndFeedback= module.exports = mongoose.model('RatingAndFeedback',ratingAndFeedbackSchema);