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


// // Add message
// module.exports.addmessage = async (messageform, callback) => {
//     if(messageform.type=="image")
//     {
//         try
//         {
//             imgUrl=await functions.uploadPicture(messageform.image_path);
//         }
//         catch(error)
//         {
//             console.log(error);
//             throw error;
//         }
//         //urlImage = JSON(imgUrl.url);
//         messageform.image_path=imgUrl.url;
//     }
//     else{
//         messageform.image_path="";
//     }    
    
    
//     message.create(messageform, callback);
// }

// Send message
module.exports.sendMessage = async (req,res) => {
    var sendMessageForm=req.body;
    var record=new message();
    if(sendMessageForm.type=="image")
    {
        try
        {
            imgUrl=await functions.uploadPicture(sendMessageForm.image_path);
        }
        catch(error)
        {
            console.log(error);
            return res.status(500).json({Message:"Error in Connecting to DB",status:false});
        }
        sendMessageForm.image_path=imgUrl.url;
    }
    else{
        sendMessageForm.image_path="";
    }

    await message.create(sendMessageForm).then(message=>
        {
            var result = message.toObject();
            result.status = true;
            return res.json(result);
        }).catch(err=>
            {
                console.log(err);
                return res.status(500).json({Message:"Error in Connecting to DB",status:false});
            })
}


// Delete message Message   
module.exports.removemessage = (id, callback) => {
    var query = {_id: id};
    message.remove(query, callback);
}

// message.update(
//     {}, 
//     {date : '12-09-2019' },
//     {multi:true}, 
//       function(err, numberAffected){  
//       });
