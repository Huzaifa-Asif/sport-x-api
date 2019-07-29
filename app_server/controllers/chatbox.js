var chatbox =require('../models/chatbox.js');

// Get Chatbox Message
module.exports.getChatbox = (callback, limit) => {
	chatbox.find(callback).limit(limit);
}

// Get Chatbox Message By ID
module.exports.getChatboxById = (id ,callback) =>  {
	chatbox.findById(id, callback);
}

// Add Chatbox Message
module.exports.addChatbox = (chatboxform, callback) => {
	chatbox.create(chatboxform, callback);
}

// Update chatbox Message
module.exports.updateChatbox = (id, chatboxform, options, callback) => {
    var query = {_id: id};
    var update = {

        message: chatboxform.message,
        senderId: chatboxform.senderId,
        recieverId: chatboxform.recieverId,
        date: chatboxform.date,
        time: chatboxform.time,
        
    }

    chatbox.findOneAndUpdate(query, update, options, callback);
}

// Delete chatbox Message   
module.exports.removeChatbox = (id, callback) => {
    var query = {_id: id};
    chatbox.remove(query, callback);
}