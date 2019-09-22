var express = require('express');
var router = express.Router();

var functions = require('../controllers/functions.js');

// Login for both serviceProvider and Customer
router.post('/login', function (req, res) {
    let email = req.body.email;
    let password = req.body.password;
    functions.login(email, password, res);

});

// Login for both serviceProvider and Customer
router.post('/resetPassword', function (req, res) {
    let email = req.body.email;
    functions.reset(email, res);
});


module.exports = router;
