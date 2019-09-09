var express = require('express');
var router = express.Router();
var expenseCategory = require('../controllers/expenseCategory.js');


//Add ExpenseCategory
router.post('/add_expenseCategory', function (req, res) {
    var addExpenseCategoryForm = req.body;
    expenseCategory.checkExpenseCategory(addExpenseCategoryForm.name, addExpenseCategoryForm.email, function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                Message: "Error in Connecting to DB",
                status: false
            });
        } else if (result) {
            return res.status(500).json({
                Message: "This category already Exists for this service provider",
                status: false
            });
        } else {
            expenseCategory.addExpenseCategory(addExpenseCategoryForm, function (err, category) {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        Message: "Error in Connecting to DB",
                        status: false
                    });
                }
                var result = category.toObject();
                result.status = true;
                return res.json(result);
            });
        }
    });

});

//Get ExpenseCategory by ServiceProvider
router.get('/get_expenseCategory_by_serviceProvider/:email', function (req, res) {
    expenseCategory.getExpenseCategoryByServiceProvider(req.params.email, function (err, result) {
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

//Delete expenseCategory
router.delete('/delete_expenseCategory/:id', function (req, res) {
    var id = req.params.id;
    expenseCategory.removeExpenseCategory(id, function (err) {
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


module.exports = router;
