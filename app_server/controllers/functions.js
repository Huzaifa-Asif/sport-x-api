var base64Img = require('base64-img');
var fs=require('fs');
const cloudinary = require('cloudinary');

module.exports.uploadCustomerPicture= async (base64) =>
{
    var uploadString="data:image/png;base64,"+base64;
    try
    {
        imgUrl = await cloudinary.uploader.upload(uploadString, {folder: "user_images/"}, function(result){
        return result.url;
        });
    }
    catch(error)
    {
        console.log(error);
        throw error;
    }
        
    return imgUrl;

} 


module.exports.uploadServiceProviderPicture= async (base64) =>
{
    var uploadString="data:image/png;base64,"+base64;
    try
    {
        imgUrl = await cloudinary.uploader.upload(uploadString, {folder: "service_provider_images/"}, function(result){
        return result.url;
        });
    }
    catch(error)
    {
        console.log(error);
        throw error;
    }
        
    return imgUrl;

} 
