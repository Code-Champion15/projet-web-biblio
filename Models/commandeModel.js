const mongoose = require("mongoose");

const commandeSchema = new mongoose.Schema(
    {
        date: {type: Date,default: Date.now},
        livres: [{type: mongoose.Schema.Types.ObjectId, ref: 'Livre'}],
        user:{type: mongoose.Schema.Types.ObjectId, ref:'User', required: true},
        etat: { type: String, enum: ['en attente', 'expédiée', 'livrée'], default: 'en attente'}
    }

);
const Commande = mongoose.model("Commande", commandeSchema);
module.exports = Commande;