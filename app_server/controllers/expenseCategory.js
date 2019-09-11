var expenseCategory =require('../models/expenseCategory.js');

// Get expenseCategory
module.exports.getExpenseCategory = (callback, limit) => {
	expenseCategory.find(callback).limit(limit);
}

// Get expenseCategory By ID
module.exports.getExpenseCategoryById = (id ,callback) =>  {
	expenseCategory.findById(id, callback);
}

// Get expenseCategory By Service Provider Email
module.exports.getExpenseCategoryByServiceProvider = (email ,callback) =>  {
	expenseCategory.find({serviceProviderEmail:email}, callback);
}

// Check expenseCategory exists for Service Provider Email
module.exports.checkExpenseCategory = (name,email ,callback) =>  {
	expenseCategory.findOne({name:name,serviceProviderEmail:email}, callback);
}

// Add expenseCategory
module.exports.addExpenseCategory = (expenseCategoryform, callback) => {
	expenseCategory.create(expenseCategoryform, callback);
}

// Update expenseCategory
module.exports.updateExpenseCategory = (id, expenseCategoryform, options, callback) => {
    var query = {_id: id};
    var update = {
        name: expenseCategoryform.name,
        serviceProviderEmail: expenseCategoryform.serviceProviderEmail
    }

    expenseCategory.findOneAndUpdate(query, update, options, callback);
}

// Delete expenseCategory
module.exports.removeExpenseCategory = (id, callback) => {
    var query = {_id: id};
    expenseCategory.remove(query, callback);
}