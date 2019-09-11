var expense =require('../models/expense.js');
var expenseCategory =require('../models/expenseCategory.js');

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
	expense.find({serviceProviderEmail:email}).sort({date:-1}).exec(callback);
}

// Get Expense By Category
module.exports.getExpenseByCategory = (email ,category,callback) =>  {
	expense.find({serviceProviderEmail:email,expenseCategory:category}, callback);
}


// Add expense
module.exports.addExpense = async(req,res) => {
    var addExpenseForm=req.body;
    let category=addExpenseForm.expenseCategory,email=addExpenseForm.serviceProviderEmail;
    await expenseCategory.find({name:category,serviceProviderEmail:email}).then(result=>
        {
            if(result.length<1)
            {
                expenseCategory.create({name:category,serviceProviderEmail:email}).catch(err=>
                    {
                        console.log(err);
                        return res.status(500).json({Message:"Error in Connecting to DB",status:false}); 
                    });
            }

        }).catch(err=>
            {
                console.log(err);
                return res.status(500).json({Message:"Error in Connecting to DB",status:false});   
            });
    await expense.create(addExpenseForm).then(expense=>
        {
            var result = expense.toObject();
            result.status = true;
            return res.json(result);
        }).catch(err=>
            {
                console.log(err);
                return res.status(500).json({Message:"Error in Connecting to DB",status:false});
            });
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


//Generate Expense Report
module.exports.getExpenseReport=(email,start,end,callback)=>
{
    // expense.distinct('expenseCategory',{serviceProviderEmail:email},callback);
    expense.aggregate(
        [
            {
                $match:
                {'serviceProviderEmail': email,
                 'date':
                  { $gte: start,
                    $lte: end }
                 } },
           {
               
             $group : {
                _id : '$expenseCategory'  ,
                categoryExpense: { $sum: '$amount' } ,
                
             }
           }
        ]
     ).exec(callback);
}