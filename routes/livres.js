var express = require('express');
var router = express.Router();
const livreController = require("../Controllers/livreController");
//const upload = require("../middlewares/uploadFile");

router.get('/',livreController.getLivres);
router.post('/',livreController.addLivre);
router.put('/update/:id',livreController.updateLivre);
router.delete('/delete/:id',livreController.deleteLivre);

module.exports = router;