const mongoose = require('mongoose');

const panierSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    livres: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Livre'}]
});

Panier = mongoose.model('Panier',panierSchema);
module.exports = Panier;