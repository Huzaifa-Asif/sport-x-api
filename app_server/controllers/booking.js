var booking =require('../models/booking.js');

// Get booking
module.exports.getBooking = (callback, limit) => {
	booking.find(callback).limit(limit);
}

// Get booking By ID
module.exports.getbBookingById = (id ,callback) =>  {
	booking.findById(id, callback);
}

// Add booking
module.exports.addbooking = (bookingform, callback) => {
	booking.create(bookingform, callback);
}

// Update booking
module.exports.updateBooking = (id, bookingform, options, callback) => {
    var query = {_id: id};
    var update = {

        bookingType: bookingform.bookingType,
        date: bookingform.date,
        time: bookingform.time,
        status: bookingform.status,
        serviceProviderId: bookingform.serviceProviderId,
        customerId: bookingform.customerId

    }

    booking.findOneAndUpdate(query, update, options, callback);
}

// Delete booking   
module.exports.removeBooking = (id, callback) => {
    var query = {_id: id};
    booking.remove(query, callback);
}