var express = require('express');
var router = express.Router();


var conversation = require('../controllers/conversation.js');




//Add Conversation
router.post('/add_conversation', function (req, res) {
    var addConversationForm = req.body;
    conversation.checkConversation(addConversationForm.serviceProviderEmail, addConversationForm.customerEmail, function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                Message: "Error in Connecting to DB",
                status: false
            });
        } else if (result) {
            if (result.state == "archived") {
                conversation.setConversationState(result._id, {
                    state: "active"
                }, {
                    new: true
                }, function (err, conversation) {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({
                            Message: "Error in Connecting to DB",
                            status: false
                        });
                    }
                    var result = conversation.toObject();
                    result.status = true;
                    return res.json(result);
                });
            } else {
                result1 = result.toObject();
                result1.status = true;
                return res.json(result1);
            }
        } else {
            conversation.addConversation(addConversationForm, function (err, conversation) {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        Message: "Error in Connecting to DB",
                        status: false
                    });
                }
                var result = conversation.toObject();
                result.status = true;
                return res.json(result);
            });
        }
    });

});

//Get Conversation by id
router.get('/get_conversation_by_id/:id', function (req, res) {
    conversation.getConversationById(req.params.id, function (err, result) {
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


//Get Active Conversation by email
router.get('/get_conversation_by_email_active/:email', function (req, res) {
    conversation.getConversationByEmail(req, res, 'active');
});

//Get Archived Conversation by email
router.get('/get_conversation_by_email_archived/:email', function (req, res) {
    conversation.getConversationByEmail(req, res, 'archived');
});

//Set Conversation State
router.patch('/set_conversation_state/:id', function (req, res) {
    conversation.setConversationState(req, res);
});



module.exports = router;
