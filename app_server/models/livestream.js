const mongoose = require('mongoose');

const schema = mongoose.Schema;

// Live Stream Schema

const liveStreamSchema = new schema({
   
    serviceProviderEmail:{
        type:String
    },
    serviceProviderName:
    {
        type:String
    },
    serviceProvider_picture_profile:{
		type: String
    },
    date:
    {
        type:String
    },
    time:
    {
        type:String
    },
    ongoing:
    {
        type:Boolean,
        default:true
    }
    

})


const liveStream= module.exports = mongoose.model('LiveStream',liveStreamSchema);