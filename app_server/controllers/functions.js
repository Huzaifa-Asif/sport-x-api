var base64Img = require('base64-img');
var fs=require('fs');
module.exports.uploadPicture= (name,base64) =>
{
    base64Img.img
    ('data:image/png;base64,'+base64,             // Base64 String
    'uploads',                                   //Destination Path
    name,                                     //Image Name
    function(err) 
    {
        if(err)
        {
            console.log(err);
        }
    });
    return 'uploads/'+name+'.png';
} 

module.exports.deleteFile= (filepath)=>
{
    // delete file named 'sample.txt'
    fs.unlink(filepath, function (err) 
    {
        if (err) 
        console.log(err);
        else
        console.log('File deleted!');
    }); 
}