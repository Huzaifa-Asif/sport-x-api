const mongoose = require('mongoose');

const schema = mongoose.Schema;

// Booking Setting Schema

const bookingSettingSchema = new schema({
    bookingType:{
        type:String
    },
    amount:{
        type:Number
    },
    openingTime:{
        type:String,
    },
    closingTime:{
        type:String,
    },
    duration:{
        type:Number
    },
    totalGrounds:
    {
        type:Number
    },
    serviceProviderEmail:{
        type:String
    }
})


const bookingSetting= module.exports = mongoose.model('BookingSetting',bookingSettingSchema);
