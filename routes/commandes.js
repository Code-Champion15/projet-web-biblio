var express = require('express');
var router = express.Router();

const commandeController = require('../Controllers/commandeController');

router.get('/',commandeController.getCommandes);
router.get('/getCommandeById/:id',commandeController.getCommandeById);
router.post('/',commandeController.addCommande);
router.put('/updateCommande',commandeController.updateCommande);
router.delete('/annulerCommande',commandeController.annulerCommande);
module.exports = router;
