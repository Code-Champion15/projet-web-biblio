const panierModel = require("../Models/panierModel");

module.exports.addPanier = async (req,res) => {
    try {
        const panier = new panierModel ({user: req.user._id});
        const addedPanier = await panier.save();
        res.status(201).json({addedPanier});

    } catch(err){
        res.status(500).json({message: err.message})
    }
};

module.exports.getPanierByUserId = async (req,res) =>{
    try{
        const panier = await panierModel.findOne({user:req.user._id}).populate('livres');
        const checkIfPanierExists = await panierModel.findById(id);
        if (!checkIfPanierExists)
            {
                throw new Error ("panier not found !")
            }
        res.status(200).json({panier});
    }catch(err){
        res.status(500).json({message: err.message})
    }   
};

module.exports.addLivreToPanier = async(req, res) =>{
    try{
        const panier = await panierModel.findOne({user: req.user._id});
        if (!checkIfPanierExists)
            {
                throw new Error ("panier not found !")
            }
        panier.livres.push(req.body.livreId);
        const updatedPanier = await panier.save();
        res.status(200).json({updatedPanier})

    }catch(err){
        res.status(500).json({message:err.message});
    }
};

module.exports.removeLivreFromPanier = async (req,res) =>{
    try{
        const panier = await panierModel.findOne({user: req.user._id});
        if (!checkIfPanierExists)
            {
                throw new Error ("panier not found !")
            }
        panier.livres.pull(req.body.livreId);
        await panier.save();
        res.status(200).json("livre supprimé");
    }catch(err){
        res.status(500).json({message : err.message});
    }
}