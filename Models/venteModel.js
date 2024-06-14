const mongoose = require("mongoose");

const venteSchema = new mongoose.Schema(
    {
        date: {type: Date,default: Date.now},
        montant:{type: Number, required: true},
        livreId: {type: mongoose.Schema.Types.ObjectId, ref: 'Livre'},
        acheteurId:{type: mongoose.Schema.Types.ObjectId, ref:'User'},
        vendeurId:{type: mongoose.Schema.Types.ObjectId, ref:'User'}
    }

);
const Vente = mongoose.model("Vente", venteSchema);
module.exports = Vente;