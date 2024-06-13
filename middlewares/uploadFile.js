const multer = require("multer");
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public')
    },
    filename: function(req,file,cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);//ligne qui change
        const fileExtension = file.originalname.split('.').pop();//ligne qui change
        cb(null, `${uniqueSuffix}.${fileExtension}`);
    }
})
var uploadImagesUsers = multer({storage: storage});
module.exports = uploadImagesUsers;