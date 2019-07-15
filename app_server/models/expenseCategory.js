const mongoose = require('mongoose');

const schema = mongoose.Schema;

// Expense Category Schema

const expenseCategorySchema = new schema({
    name:{
        type:String
    },
    serviceProviderId:{
        type:String
    }
})


const expenseCateogry= module.exports = mongoose.model('ExpenseCategory',expenseCategorySchema);