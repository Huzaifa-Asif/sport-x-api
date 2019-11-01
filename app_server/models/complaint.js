const mongoose = require('mongoose');

const schema = mongoose.Schema;

// Complaint Schema

const complaintSchema = new schema({
   
    complainantEmail:{
        type:String
    },
    complaint:{
        type:String
    },
    serviceProviderEmail:{
        typr:String
    }
    
    

})

const complaint= module.exports = mongoose.model('Complaint',complaintSchema);