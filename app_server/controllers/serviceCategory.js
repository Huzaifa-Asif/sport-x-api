var serviceCategory =require('../models/serviceCategory.js');
var functions =require('../controllers/functions.js');

// Get Service Categories
module.exports.getServiceCategory = (callback, limit) => {
	serviceCategory.find(callback).limit(limit);
}

// Add serviceCategory
module.exports.addServiceCategory = (serviceCategoryform, callback) => {
    let record=new serviceCategory();
    record.name=serviceCategoryform.name;

    if(serviceCategoryform.picture)
    record.picture=functions.uploadPicture(record.name,serviceCategoryform.picture)

    record.save(callback);
}

// Update serviceCategory
module.exports.updateServiceCategory = (name, serviceCategoryform, options, callback) => {
    var query = {name: name};
    if(serviceCategoryform.picture)
    serviceCategoryform.picture=functions.uploadPicture(name,serviceCategoryform.picture);
    serviceCategory.findOneAndUpdate(query, {picture:serviceCategoryform.picture}, options, callback);
}

// Delete serviceCategory
module.exports.removeServiceCategory = (name, callback) => {
    var query = {name: name};
    var filepath='uploads/'+name+'.png';
    functions.deleteFile(filepath);
    serviceCategory.remove(query, callback);
}

// Check ServiceCategory exists
module.exports.getServiceCategoryByName = (name,callback) => {
	serviceCategory.findOne({name:name},callback);
}
