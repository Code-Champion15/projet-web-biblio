var express = require('express');
var router = express.Router();

const commandeController = require('../Controllers/commandeController');

router.get('/getCommandes',commandeController.getCommandes);
router.get('/getcommandeByEtat/:etat',commandeController.getCommandeByEtat)
router.get('/getCommandeById/:id',commandeController.getCommandeById);
router.post('/addCommande',commandeController.addCommande);
router.put('/updateCommande/:id',commandeController.updateCommande);
router.delete('/annulerCommande/:id',commandeController.annulerCommande);
module.exports = router;
