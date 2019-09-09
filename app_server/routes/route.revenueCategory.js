var express = require('express');
var router = express.Router();
var revenueCategory = require('../controllers/revenueCategory.js');


//Add RevenueCategory
router.post('/add_revenueCategory', function (req, res) {
    var addRevenueCategoryForm = req.body;
    revenueCategory.checkRevenueCategory(addRevenueCategoryForm.name, addRevenueCategoryForm.email, function (err, result) {
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
            revenueCategory.addRevenueCategory(addRevenueCategoryForm, function (err, category) {
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

//Get RevenueCategory by ServiceProvider
router.get('/get_revenueCategory_by_serviceProvider/:email', function (req, res) {
    revenueCategory.getRevenueCategoryByServiceProvider(req.params.email, function (err, result) {
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

//Delete RevenueCategory
router.delete('/delete_revenueCategory/:id', function (req, res) {
    var id = req.params.id;
    revenueCategory.removeRevenueCategory(id, function (err) {
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
