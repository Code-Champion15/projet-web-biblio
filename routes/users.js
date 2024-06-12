var express = require('express');
var router = express.Router();

const userController = require("../Controllers/userController");
const upload = require("../middlewares/uploadFile")
/* GET users listing. */
//router.get('/', function(req, res, next) {
 // res.json('respond with a resource');
//});
router.get('/',userController.getUsers );
router.get('/getUserById/:id', userController.getUserById );
router.post('/',userController.addUserC );
router.post('/addwithImg',upload.single("image_user"),userController.addUser);
router.delete('/deleteUser/:id',userController.deleteUser );
router.put('/updateUser/:id',userController.updateUserC);
router.put('/updatePassword/:id',userController.updateUserPassword);

module.exports = router;
