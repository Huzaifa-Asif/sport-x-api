var message =require('../models/message.js');
var functions =require('../controllers/functions.js');


// Get message By ID
module.exports.getmessageById = (id ,callback) =>  {
	message.findById(id, callback);
}

// Get message By conversation Id
module.exports.getMessageByConversationId = (id ,callback) =>  {
	message.find({conversationId:id}, callback);
}


// Add message
module.exports.addmessage = async (messageform, callback) => {
    if(messageform.type=="image")
    {
        try
        {
            imgUrl=await functions.uploadPicture(messageform.image_path);
        }
        catch(error)
        {
            console.log(error);
            throw error;
        }
        //urlImage = JSON(imgUrl.url);
        messageform.image_path=imgUrl.url;
    }
    else{
        messageform.image_path="";
    }    
    
    
    message.create(messageform, callback);
}


// Delete message Message   
module.exports.removemessage = (id, callback) => {
    var query = {_id: id};
    message.remove(query, callback);
}