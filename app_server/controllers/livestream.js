const livestream=require('../models/livestream.js');

//Add Live Stream
module.exports.addLiveStream=(livestreamform,callback)=>
{
    const today = new Date();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    const date = yyyy + '-' + mm + '-' + dd;
    livestreamform.time=time;
    livestreamform.date=date;
    livestream.create(livestreamform,callback)
}

//Stop Live Stream (Change ongoing to false)
module.exports.stoplivestream=(id,options,callback)=>
{
    livestream.findByIdAndUpdate(id, {ongoing:false}, options, callback);
}

//Get All Ongoing Strams
module.exports.getAllOngoingStreams=(callback)=>
{
    livestream.find({ongoing:true},callback);
}

//Check if serviceProvider is already Streaming
module.exports.checkOngoingStreamByServiceProviderEmail=(email,callback)=>
{
    livestream.findOne({serviceProviderEmail:email,ongoing:true},callback);
}