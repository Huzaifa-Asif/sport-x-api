const mongoose = require('mongoose');

const schema = mongoose.Schema;

// Booking Schema

const bookingSchema = new schema({
    bookingType:{
        type:String
    },
    date:{
        type:Date
    },
    time:{
        type:String
    },
    state:{
        type:String,
        default:'pending'
    },
    serviceProviderEmail:{
        type:String
    },
    customerEmail:{
        type:String
    }
})


const booking= module.exports = mongoose.model('Booking',bookingSchema);
