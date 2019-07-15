const mongoose = require('mongoose');

const schema = mongoose.Schema;

// Booking Details Schema

const bookingDetailsSchema = new schema({
    bookingType:{
        type:String
    },
    duration:{
        type:String
    },
    price:{
        type:Number
    },
    serviceProviderEmail:{
        type:String
    }
})


const bookingDetails= module.exports = mongoose.model('BookingDetails',bookingDetailsSchema);