const mongoose = require('mongoose');

const schema = mongoose.Schema;

// Expense Schema

const expenseSchema = new schema({
    expenseCategory:{
        type:String
    },
    amount:{
        type:Number
    },
    serviceProviderId:{
        type:String
    },
    date:{
        type:Date
    }
})


const expense= module.exports = mongoose.model('Expense',expenseSchema);