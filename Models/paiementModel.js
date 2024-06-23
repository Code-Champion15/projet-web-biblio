const mongoose = require('mongoose');

const paiementSchema = new mongoose.Schema({
    commande: {type: mongoose.Schema.Types.ObjectId, ref: 'Commande', required: true},
    montant: {type: Number, required: true},
    dateDePaiement: { type: Date, default: Date.now },
    methodeDePaiement: {type: String, enum: ['stripe', 'a la livraison'], required:true}
    //sessionId: {type: String, required: false}
});

const Paiement = mongoose.model('Paiement', paiementSchema);
module.exports = Paiement;