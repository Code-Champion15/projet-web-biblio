var express = require('express');
var router = express.Router();
const paiementController = require("../Controllers/paiementController");

router.get('/getPaiement',paiementController.getPaiement);
router.post('/addPaiement',paiementController.addPaiement);

module.exports = router;