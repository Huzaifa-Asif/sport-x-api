const mongoose = require('mongoose');

const schema = mongoose.Schema;

// Expense Category Schema

const expenseCategorySchema = new schema({
    name:{
        type:String
    },
    serviceProviderEmail:{
        type:String
    }
})


const expenseCateogry= module.exports = mongoose.model('ExpenseCategory',expenseCategorySchema);