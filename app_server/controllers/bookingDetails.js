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






// UPDATE BOOKING STATUS
module.exports.updateBookingState = (req, res) => {
    bookingDetails.findByIdAndUpdate(req.params.id, {$set: {"state":req.body.status}})
    .then(() => res.json({
        status: "success",
        message: "Request Accepted"
    })).catch(err => res.json({
        status: "failed",
        message: "Request Failed"
    }));
}


// PROVIDER ALL COMPLETED JOBS
module.exports.completedBookings = (req, res) => {
    bookingDetails.find( { $and: [ { state: "completed" }, {serviceProviderEmail: req.params.email}] })
    .then(result => res.json(result)).catch(err => res.json({
        status: "failed",
        message: "Request Failed"
    }));
}

// PROVIDER ALL Pending JOBS
module.exports.pendingBookings = (req, res) => {
    bookingDetails.find( { $and: [ { state: "pending" }, {serviceProviderEmail: req.params.email}] })
    .then(result => res.json(result)).catch(err => res.json({
        status: "failed",
        message: "Request Failed"
    }));
}

// CUSTOMER ALL Pending JOBS
module.exports.customerPendingBookings = (req, res) => {
    bookingDetails.find( { $and: [ { state: "pending" }, {customerEmail: req.params.email}] })
    .then(result => res.json(result)).catch(err => res.json({
        status: "failed",
        message: "Request Failed"
    }));
}

// CUSTOMER ALL Completed JOBS
module.exports.customerCompletedBookings = (req, res) => {
    bookingDetails.find( { $and: [ { state: "completed" }, {customerEmail: req.params.email}] })
    .then(result => res.json(result)).catch(err => res.json({
        status: "failed",
        message: "Request Failed"
    }));
}

