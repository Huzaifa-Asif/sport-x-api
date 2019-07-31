var message =require('../models/message.js');


// Get message By ID
module.exports.getmessageById = (id ,callback) =>  {
	message.findById(id, callback);
}

// Add message
module.exports.addmessage = (messageform, callback) => {
	message.create(messageform, callback);
}


// Delete message Message   
module.exports.removemessage = (id, callback) => {
    var query = {_id: id};
    message.remove(query, callback);
}