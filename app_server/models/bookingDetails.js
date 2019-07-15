const mongoose = require('mongoose');

const schema = mongoose.Schema;

// Booking Details Schema

const bookingDetailsSchema = new schema({
    state:{
      type:String,
      default:"pending"
    },
    bookingType:{
        type:String
    },
    date:{
        type:String
    },
    time:{
        type:String
    },
    serviceProviderEmail:{
        type:String
    },
    customerEmail:{
        type:String
    }
})


const bookingDetails= module.exports = mongoose.model('BookingDetails',bookingDetailsSchema);
