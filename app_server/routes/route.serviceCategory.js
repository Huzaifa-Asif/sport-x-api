var express = require('express');
var router = express.Router();
var serviceCategory = require('../controllers/serviceCategory.js');




// Get Service Category
router.get('/get_serviceCategory', function (req, res) {
    serviceCategory.getServiceCategory(function (err, result) {
        if (err)
            return res.status(500).json({
                Message: "Error in Connecting to DB",
                status: false
            });

        return res.json(result);

    });

});


//Add Service Category
router.post('/add_serviceCategory', function (req, res) {
    var serviceCategoryform = req.body;
    serviceCategory.getServiceCategoryByName(serviceCategoryform.name, function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                Message: "Error in Connecting to DB",
                status: false
            });
        } else if (result)
            return res.json({
                Message: "Service Category Already Exists",
                status: false
            });
        else {
            serviceCategory.addServiceCategory(serviceCategoryform, function (err, serviceCategory) {
                if (err)
                    return res.status(500).json({
                        Message: "Error in Connecting to DB",
                        status: false
                    });

                var result = serviceCategory.toObject();
                result.status = true;
                return res.json(result);

            });
        }
    });

});


//Update Service Category
router.patch('/update_serviceCategory/:name', function (req, res) {
    var serviceCategoryform = req.body;
    var name = req.params.name;
    serviceCategory.updateServiceCategory(name, serviceCategoryform, {
        new: true
    }, function (err, serviceCategory) {
        if (err)
            return res.status(500).json({
                Message: "Error in Connecting to DB",
                status: false
            });

        var result = serviceCategory.toObject();
        result.status = true;
        return res.json(result);
    });

});


//Delete Service Category
router.delete('/delete_serviceCategory/:name', function (req, res) {
    var name = req.params.name;
    serviceCategory.removeServiceCategory(name, function (err) {
        if (err)
            return res.status(500).json({
                Message: "Error in Connecting to DB",
                status: false
            });

        return res.json({
            status: true
        });
    });

});





module.exports = router;
