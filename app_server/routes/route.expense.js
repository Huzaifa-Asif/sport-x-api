var express = require('express');
var router = express.Router();
var expense = require('../controllers/expense.js');




//Add Expense
router.post('/add_expense', function (req, res) {
    expense.addExpense(req, res);

});



//Get Expense by ServiceProvider.
router.get('/get_expense_by_serviceProvider/:email', function (req, res) {
    expense.getExpenseByServiceProvider(req.params.email, function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                Message: "Error in Connecting to DB",
                status: false
            });
        }
        return res.json(result);

    });

});

//Get Expense by Category
router.get('/get_expense_by_category', function (req, res) {
    expense.getExpenseByCategory(req.query.email, req.query.category, function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                Message: "Error in Connecting to DB",
                status: false
            });
        }
        return res.json(result);

    });

});


//Delete expense 
router.delete('/delete_expense/:id', function (req, res) {
    var id = req.params.id;
    expense.removeExpense(id, function (err) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                Message: "Error in Connecting to DB",
                status: false
            });
        }
        return res.json({
            status: true
        });
    });

});


//Get Expense Report
router.get('/expense_report',function(req,res)
{
    expense.getExpenseReport(req.query.email,req.query.start,req.query.end,function (err,result)
    {
        if(err)
        {
            console.log(err);
            return res.status(500).json({
                Message: "Error in Connecting to DB",
                status: false
            });
        }
        else if(result)
        {
            res.json(result);
        }
        else{
            return res.status(500).json({
                Message: "No Expenses Found",
                status: false
            });
            
        }
    })
});


module.exports = router;
