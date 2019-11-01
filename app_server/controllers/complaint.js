var complaint=require('../models/complaint.js');


// Get Complaints
module.exports.getComplaints = (callback) => {
	complaint.find(callback);
}

// Get Complaint By Id
module.exports.getComplaintById = (id ,callback) =>  {
	complaint.findById(id, callback);
}

// Add Complaint 
module.exports.addComplaint = (complaintform, callback) => {
	complaint.create(complaintform, callback);
}

// Delete Complaint   
module.exports.removeComplaint = (id, callback) => {
    var query = {_id: id};
    complaint.remove(query, callback);
}