var express = require('express');
var router = express.Router();
var message = require('../controllers/message.js');
var conversation = require('../controllers/conversation.js');
var customer = require('../controllers/customer.js');
var serviceProvider = require('../controllers/serviceProvider.js');

//Send Message
router.post('/send_message', function (req, res) {
    message.sendMessage(req, res);
});

//Get Messages by Conversation Id
router.get('/get_message_by_conversationId/:id', function (req, res) {

    message.getMessageByConversationId(req.params.id, function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                Message: "Error in Connecting to DB",
                status: false
            });
        } else {
            let conversationId = result[0].conversationId;
            conversation.getConversationById(conversationId, async function (err, conversation) {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        Message: "Error in Connecting to DB",
                        status: false
                    });
                } else {
                    let customerEmail = conversation.customerEmail;
                    let serviceProviderEmail = conversation.serviceProviderEmail;
                    let customerName, serviceProviderName, customerPicture, serviceProviderPicture;
                    customer.getCustomerByEmail(customerEmail, function (err, customer) {
                        if (err) {
                            console.log(err);
                            return res.status(500).json({
                                Message: "Error in Connecting to DB",
                                status: false
                            });
                        } else {
                            customerName = customer.name;
                            customerPicture = customer.picture;
                            serviceProvider.getServiceProviderByEmail(serviceProviderEmail, function (err, serviceProvider) {
                                if (err) {
                                    console.log(err);
                                    return res.status(500).json({
                                        Message: "Error in Connecting to DB",
                                        status: false
                                    });
                                } else {
                                    serviceProviderName = serviceProvider.name;
                                    serviceProviderPicture = serviceProvider.picture_profile;

                                    let finalResult = [];
                                    for (let i = 0; i < result.length; i++) {
                                        finalResult[i] = result[i].toObject();
                                        finalResult[i].customerName = customerName;
                                        finalResult[i].customerEmail = customerEmail;
                                        finalResult[i].customerPicture = customerPicture;
                                        finalResult[i].serviceProviderName = serviceProviderName;
                                        finalResult[i].serviceProviderEmail = serviceProviderEmail;
                                        finalResult[i].serviceProviderPicture = serviceProviderPicture;
                                    }
                                    return res.json(finalResult);
                                }

                            });
                        }
                    });

                }
            });
        }

    });

});





module.exports = router;
