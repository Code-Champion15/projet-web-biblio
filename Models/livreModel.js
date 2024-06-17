const mongoose = require("mongoose");

const livreSchema = new mongoose.Schema(
    {
        titre : String,
        auteur : String,
        genre : String,
        prix : Number,
        etat : [String],
        description : String,
        vendeur: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
        image_livre: { type: String, required: false, default: "livre.png"},
        vendu: {type: Boolean, default: false}
    },
    {timestamps: true}
);

const Livre = mongoose.model("Livre", livreSchema);
module.exports = Livre;
