var express = require('express');
var router = express.Router();

const panierController = require("../Controllers/panierController");

router.get('/getPanierByUserId',panierController.getPanierByUserId);
router.post('/addPanier',panierController.addPanier);
router.post('/addLivreToPanier',panierController.addLivreToPanier);
router.delete('/removeLivreFromPanier',panierController.removeLivreFromPanier);


module.exports = router;