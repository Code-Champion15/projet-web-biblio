const livreModel = require("../Models/livreModel");

module.exports.addLivre = async (req,res) => {
    try{
        const livre = new livreModel({...req.body, vendeur:req.User._id });
        console.log(livre);
        const AddedLivre = await livre.save();
        res.status(201).json({AddedLivre})
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
        const livre = await Livre.findById(id).populate('vendeur');
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
        const {titre, auteur, prix, etat, description} = req.body;
        
        update = await livreModel.findByIdAndUpdate(
            id, {
                $set:{ titre, auteur, prix, etat, description}
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