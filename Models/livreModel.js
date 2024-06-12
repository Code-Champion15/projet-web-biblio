const mongoose = require('mongoose');

const livreSchema = new mongoose.Schema({
    titre: String,
    auteur: String,
    prix: Number,
    etat:{
        type: String,
        enum: ["neuf", "bon etat", "moyen etat"],
    },
    description: String,
    vendeurId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    image_livre: { type: String, required: false, default: "livre.png" },
},
{ timestamps: true }
);

livreSchema.post("save", async function (req, res, next) {
    console.log("new book was created & saved successfully");
    next();
  });
  

const Livre = mongoose.model('Livre', livreSchema);

module.exports = Livre;