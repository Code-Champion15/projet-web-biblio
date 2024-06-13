const mongoose = require("mongoose");

const livreSchema = new mongoose.Schema(
    {
        titre : String,
        auteur : String,
        genre : String,
        prix : Number,
        etat : [String],
        description : String,
        vendeurId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
        image_livre: { type: String, required: false, default: "livre.png"}
    },
    {timestamps: true}
);

const Livre = mongoose.model("livre", livreSchema);
module.exports = Livre;
