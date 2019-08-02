var conversation =require('../models/conversation.js');


// Get conversation By ID
module.exports.getConversationById = (id ,callback) =>  {
	conversation.findById(id, callback);
}

// Get conversation By email
module.exports.getConversationByEmail = (email ,callback) =>  {
	conversation.find({
		$or: 
		[
		  { 'customerEmail': email },
		  { 'serviceProviderEmail': email }
		]
	  }, callback);
}


// Check if a conversation already exists that is archived
module.exports.checkConversation = (serviceProviderEmail,customerEmail,callback) =>  {
	conversation.findOne({serviceProviderEmail:serviceProviderEmail,customerEmail:customerEmail}, callback);
}

// Add conversation
module.exports.addConversation = (conversationform, callback) => {
	conversation.create(conversationform, callback);
}

// Update conversation State
module.exports.setConversationState = (id,conversationForm, options, callback) => {
    var query = {_id: id};
    
    conversation.findOneAndUpdate(query, conversationForm, options, callback);
}

