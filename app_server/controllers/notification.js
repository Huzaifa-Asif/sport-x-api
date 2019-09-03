var notification =require('../models/notification.js');

// Get notification
module.exports.getNotification = (callback, limit) => {
	notification.find(callback).limit(limit);
}


// Add notification
module.exports.addNotification = (notificationform, callback) => {
	notification.create(notificationform, callback);
}

// Delete notification   
module.exports.removenotification = (id, callback) => {
    var query = {_id: id};
    notification.remove(query, callback);
}