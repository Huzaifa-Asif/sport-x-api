var bookingDetails =require('../models/bookingDetails.js');

// Get bookingDetails By serviceProvider Email
module.exports.getBookingDetailsByEmail = (email ,callback) =>  {
    bookingDetails.
    find({ serviceProviderEmail: email }).
    exec(callback);
}

// Add bookingDetails
module.exports.addBookingDetails = (bookingDetailsform, callback) => {
    bookingDetails.create(bookingDetailsform, callback);
}

// Update bookingDetails for Service Provider by id
module.exports.updateBookingDetails = (id, bookingDetailsform, options, callback) => {
    var query = {_id: id};
    bookingDetails.findOneAndUpdate(query, bookingDetailsform, options, callback);
}

// Delete bookingDetails for Service Provider by id   
module.exports.removeBookingDetails = (id, callback) => {
    var query = {_id: id};
    bookingDetails.remove(query, callback);
}

// Get bookingDetails
module.exports.getBookingDetails = (callback, limit) => {
	bookingDetails.find(callback).limit(limit);
}

// Get bookingDetails By ID
module.exports.getBookingDetailsById = (id ,callback) =>  {
	bookingDetails.findById(id, callback);
}

