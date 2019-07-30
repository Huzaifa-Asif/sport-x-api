var expense =require('../models/expense.js');

// Get Expense
module.exports.getExpense = (callback, limit) => {
	expense.find(callback).limit(limit);
}

// Get Expense By ID
module.exports.getExpenseById = (id ,callback) =>  {
	expense.findById(id, callback);
}

// Get Expense By ServiceProvider
module.exports.getExpenseByServiceProvider = (email ,callback) =>  {
	expense.find({serviceProviderEmail:email}, callback);
}

// Get Expense By Category
module.exports.getExpenseByCategory = (email ,category,callback) =>  {
	expense.find({serviceProviderEmail:email,expenseCategory:category}, callback);
}

// Add expense
module.exports.addExpense = (expenseform, callback) => {
	expense.create(expenseform, callback);
}

// Update expense
module.exports.updateExpense = (id, expenseform, options, callback) => {
    var query = {_id: id};
    var update = {

        expenseCategory: expenseform.expenseCategory,
        amount: expenseform.amount,
        serviceProviderEmail: expenseform.serviceProviderEmail,
        date: expenseform.date
        
        
    }

    expense.findOneAndUpdate(query, update, options, callback);
}

// Delete expense
module.exports.removeExpense = (id, callback) => {
    var query = {_id: id};
    expense.remove(query, callback);
}