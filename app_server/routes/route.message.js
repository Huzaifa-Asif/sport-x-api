var express = require('express');
var router = express.Router();
var message = require('../controllers/message.js');



//Send Message
router.post('/send_message', function (req, res) {
    message.sendMessage(req, res);
});





module.exports = router;
