var express = require('express');
var router = express.Router();

const venteController = require('../Controllers/venteController');

router.get('/',venteController.getVentes);
router.get('/venteId',venteController.getVenteById);
router.post('/',venteController.addVente);

module.exports = router;
