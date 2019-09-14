var conversation =require('../models/conversation.js');
var customer =require('../models/customer.js');
var serviceProvider =require('../models/serviceProvider.js');


// Get conversation By ID
module.exports.getConversationById = (id ,callback) =>  {
	conversation.findById(id, callback);
}




// Get conversation By email
module.exports.getConversationByEmail = (req ,res,state) =>  {
	let email=req.params.email
	conversation.find({
		$and: [
			{ state:state },
			{ $or: 
				[
				  { 'customerEmail': email },
				  { 'serviceProviderEmail': email }
				] }
		]
			  }).then(async function(result)
			  {
				  let finalResult=[];
				for(let i=0;i<result.length;i++)
				{
					finalResult[i]=result[i].toObject();
					let customerEmail=result[i].customerEmail;
					let serviceProviderEmail=result[i].serviceProviderEmail;
					try{
					await customer.findOne({email:customerEmail}).exec().then(customer=>
						{
							finalResult[i].customerName=customer.name;
							finalResult[i].customerPic=customer.picture;
							
						}).catch(err=>
						{
							console.log(err);
			     		    return res.status(500).json({Message:"Error in Connecting to DB",status:false});
						});
					await serviceProvider.findOne({email:serviceProviderEmail}).exec().then(serviceProvider=>
						{
							finalResult[i].serviceProviderName=serviceProvider.name;
							finalResult[i].serviceProviderPic=serviceProvider.picture_profile;
						}).catch(err=>
						{
							console.log(err);
							return res.status(500).json({Message:"Error in Connecting to DB",status:false});
					   });
					   console.log(result[i]);
					}catch(err)
					{
						console.log(err);
						return res.status(500).json({Message:"Error in Connecting to DB",status:false});
					}
					
				}
				return res.json(finalResult);
			}).catch(err=>{
				  console.log(err);
				  return res.status(500).json({Message:"Error in Connecting to DB",status:false});
			});
}


// Check if a conversation already exists that is archived
module.exports.checkConversation = (serviceProviderEmail,customerEmail,callback) =>  {
	conversation.findOne({serviceProviderEmail:serviceProviderEmail,customerEmail:customerEmail}, callback);
}

// Add conversation
module.exports.addConversation = (conversationform, callback) => {
	conversation.create(conversationform, callback);
}

// // Update conversation State
// module.exports.setConversationState = (id,conversationForm, options, callback) => {
//     var query = {_id: id};
    
//     conversation.findOneAndUpdate(query, conversationForm, options, callback);
// }

// Update conversation State
module.exports.setConversationState = (req,res) => {
	let conversationForm=req.body;
	let id=req.params.id;
	let query={_id:id};
	conversation.findOneAndUpdate(query, conversationForm, {new:true})
	.exec()
	.then(conversation=>
		{
			var result = conversation.toObject();
        	result.status = true;
        	return res.json(result);
		})
	.catch(err=>
		{
			console.log(err);
            return res.status(500).json({Message:"Error in Connecting to DB",status:false});
		});
}


// conversation.update(
//     {}, 
//     {date : '12-09-2019',time:'00:00:00' },
//     {multi:true}, 
//       function(err, numberAffected){  
//       });