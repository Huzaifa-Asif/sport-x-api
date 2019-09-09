var express = require('express');
var router = express.Router();
var revenue = require('../controllers/revenue.js');


//Add Revenue
router.post('/add_revenue', function (req, res) {
    revenue.addrevenue(req, res);

});

//Get Revenue by ServiceProvider
router.get('/get_revenue_by_serviceProvider/:email', function (req, res) {
    revenue.getRevenueByServiceProvider(req.params.email, function (err, result) {
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

//Get Revenue by Category
router.get('/get_revenue_by_category', function (req, res) {
    revenue.getRevenueByCategory(req.query.email, req.query.category, function (err, result) {
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

//Delete Revenue
router.delete('/delete_revenue/:id', function (req, res) {
    var id = req.params.id;
    revenue.removeRevenue(id, function (err) {
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
