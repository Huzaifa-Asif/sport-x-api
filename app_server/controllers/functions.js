var base64Img = require('base64-img');
var fs=require('fs');
const cloudinary = require('cloudinary');

module.exports.uploadPicture= async (base64) =>
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


