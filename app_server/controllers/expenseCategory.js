var expenseCategory =require('../models/expenseCategory.js');

// Get expenseCategory
module.exports.getExpenseCategory = (callback, limit) => {
	expenseCategory.find(callback).limit(limit);
}

// Get expenseCategory By ID
module.exports.getExpenseCategoryById = (id ,callback) =>  {
	expenseCategory.findById(id, callback);
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
        serviceProviderId: expenseCategoryform.serviceProviderId
    }

    expenseCategory.findOneAndUpdate(query, update, options, callback);
}

// Delete expenseCategory
module.exports.removeExpenseCategory = (id, callback) => {
    var query = {_id: id};
    expenseCategory.remove(query, callback);
}