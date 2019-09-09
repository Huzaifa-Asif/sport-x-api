var express = require('express');
var router = express.Router();


var admin = require('../controllers/admin.js');



//Add Admin
router.post('/signup_Admin', function (req, res) {
    var adminform = req.body;
    admin.addAdmin(adminform, function (err, admin) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                Message: "Error in Connecting to DB",
                status: false
            });
        }
        var result = admin.toObject();
        result.status = true;
        return res.json(result);
    });

});



//Login for Admin
router.post('/loginAdmin', function (req, res) {
    let email = req.body.email;
    let password = req.body.password;
    admin.login(email, password, res);


});


module.exports = router;
