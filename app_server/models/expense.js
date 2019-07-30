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
    serviceProviderEmail:{
        type:String
    },
    date:{
        type:String
    },
    description:{
        type:String
    }
})


const expense= module.exports = mongoose.model('Expense',expenseSchema);