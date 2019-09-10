var bookingSetting =require('../models/bookingSetting.js');

// Add bookingSetting
module.exports.addbookingSetting = (bookingSettingform, callback) => {
	bookingSetting.create(bookingSettingform, callback);
}


//Get Booking Setting By Service Provider Email
module.exports.getBookingSettingByServiceProvider = (email ,callback) =>  {
	bookingSetting.findOne({serviceProviderEmail:email}, callback);
}

// Update bookingSetting
module.exports.updateBookingSetting = (email, bookingSettingform, options, callback) => {
    var query = {serviceProviderEmail: email};
    bookingSetting.findOneAndUpdate(query, bookingSettingform, options, callback);
}









// Get bookingSetting
module.exports.getbookingSetting = (callback, limit) => {
	bookingSetting.find(callback).limit(limit);
}

// Get bookingSetting By ID
module.exports.getbbookingSettingById = (id ,callback) =>  {
	bookingSetting.findById(id, callback);
}




// Delete bookingSetting   
module.exports.removebookingSetting = (id, callback) => {
    var query = {_id: id};
    bookingSetting.remove(query, callback);
}