var express = require('express');
var router = express.Router();
const livestream = require('../controllers/livestream.js');

//Start Live Stream
router.post('/startlivestream',function(req,res)
{
    livestream.checkOngoingStreamByServiceProviderEmail(req.body.serviceProviderEmail,function(err,result)
    {
        if (err) {
            console.log(err);
            return res.status(500).json({
                Message: "Error in Connecting to DB",
                status: false
            });
        }
        else if(result)
        {
            return res.json({status:false,Message:"This Service Provider is already Streaming"});
        }
        else
        {
            livestream.addLiveStream(req.body,function(err,result)
            {
                if (err) 
                {
                    console.log(err);
                    return res.status(500).json({
                    Message: "Error in Connecting to DB",
                    status: false
                    });
                }
                else
                {
                    let result1=result.toObject();
                    result1.status=true;
                    return res.json(result1);
                }
            })
        }
    })
    
    
    
})

//Stop Live Stream (change ongoing to false)
router.post('/stoplivestream',function(req,res)
{
    livestream.stoplivestream(req.body.id,{new:true},function(err,result)
    {
        if (err) {
            console.log(err);
            return res.status(500).json({
                Message: "Error in Connecting to DB",
                status: false
            });
        }
        else
        {

            let result1=result.toObject();
            result1.status=true;
            return res.json(result1);
        }
    })
})

//Get All ongoing Streams 
router.get('/ongoingstreams',function(req,res)
{
    livestream.getAllOngoingStreams(function(err,result)
    {
        if (err) {
            console.log(err);
            return res.status(500).json({
                Message: "Error in Connecting to DB",
                status: false
            });
        }
        else
        {
            return res.json(result);
        }
    })
})


module.exports = router;
