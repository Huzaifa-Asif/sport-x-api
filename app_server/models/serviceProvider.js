const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

// Service Provider Schema

const serviceProviderSchema = mongoose.Schema({
	name:{
		type: String,
	},
	email:{
		type: String,
	},
	contact:{
		type: String
	},
	address:{
		type: String,
	},
	location:{
		long:
		{
		type: Number,
		},
		lat:
		{
		type: Number,
		}
		},
	category:{
		type: String,
	},
	picture_profile:{
		type: String
	},
	picture_cover:{
		type: String
	},
	picture_1:{
		type: String
	},
	picture_2:{
		type: String
	},
	picture_3:{
		type: String
	},
	picture_4:{
		type: String
	},
	picture_5:{
		type: String
	},
	password:{
		type: String
	},
	state:{
		type: String,
		default:"pending"
	},
	role:
    {
        type:Number,
        default:1
	},
	token:
    {
        type:String
        
	}
	
    
});
serviceProviderSchema.methods.hashPassword = function(password){
	return bcrypt.hashSync(password,bcrypt.genSaltSync(10))
}
serviceProviderSchema.methods.comparePassword = function(password,hash){
	return bcrypt.compareSync(password,hash)
}
serviceProviderSchema.index( { location : "2dsphere" } );
 

const serviceProvider = module.exports = mongoose.model('ServiceProvider', serviceProviderSchema);
