const livreModel = require("../Models/livreModel");
const userModel = require("../Models/userModel");

module.exports.addLivre = async (req,res) => {
    try{
        const { titre, auteur, genre, prix, UserId} = req.body;
        const user = await userModel.findById(UserId);
        if(!user) {
            throw new Error("User not found");
        }
        const livre = new livreModel ({
            titre,
            auteur,
            genre,
            prix,
            vendeur: UserId,
        });

        await userModel.findByIdAndUpdate(UserId, {
            $push: {livres: livre._id},
        });
        livre.save();
        res.status(200).json({livre});
    } catch (err){
        res.status(500).json({message: err.message});
    }
};

module.exports.getLivres = async (req,res) => {
    try{
        const livres = await livreModel.find({ vendu: false}).populate('vendeur');//recupere seulement les livres non vendus
        if(livres.length === 0 && !livres) {
            throw new Error ("no books found");
        }
        res.status(200).json({livres});
    } catch (err){
        res.status(500).json({message : err.message})
    }
    
};

module.exports.getLivreById = async (req,res) => {
    try{
        const {id} =req.params;
        const livre = await livreModel.findById(id).populate('vendeur');
        const checkIfLivreExists = await livreModel.findById(id);
        if (!checkIfLivreExists)
            {
                throw new Error ("book not found !")
            }
        res.status(200).json({livre});
    }catch(err){
        res.status(500).json({message: err.message})
    }
}

module.exports.updateLivre = async(req,res) =>{
    try{
        const {id} =req.params;
        const {titre, auteur, prix, etat, description, vendeur} = req.body;
        
        update = await livreModel.findByIdAndUpdate(
            id, {
                $set:{ titre, auteur, prix, etat, description, vendeur}
            },
            {new : true}
        )
        res.status(201).json({update});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

module.exports.deleteLivre = async (req,res) =>{
    try{
        const {id} = req.params;
        const checkIfLivreExists = await livreModel.findById(id);
        if(!checkIfLivreExists)
            {
                throw new Error ("book not found");
            }
        await livreModel.findByIdAndDelete(id);
        res.status(201).json("deleted");
    } catch(err){
        res.status(500).json({message: err.message});
    };
}