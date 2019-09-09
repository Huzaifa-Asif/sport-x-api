var express = require('express');
var router = express.Router();
var ratingAndFeedback = require('../controllers/ratingAndFeedback.js');



// Post Ratings
router.post('/post_rating', ratingAndFeedback.post_rating);

// Find Rating of a Job
router.get('/findRating/:id', ratingAndFeedback.findRating);




module.exports = router;
