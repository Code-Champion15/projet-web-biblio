var express = require('express');
var router = express.Router();

const userController = require("../Controllers/livreController");
const upload = require("../middlewares/uploadFile")

router.get('/',livreController.getLivres );
router.get('/getLivreById/:id', livreController.getLivreByID );
router.post('/',livreController.addLivre );
router.post('/addwithImg',upload.single("image_livre"),livreController.addLivre);
router.delete('/deleteLivre/:id',livreController.deleteLivre );
router.put('/updateLivre/:id',livreController.updateLivre);

module.exports = router;