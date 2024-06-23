const panierModel = require("../Models/panierModel");
const userModel = require("../Models/userModel");


module.exports.addPanier = async (req,res) => {
    try {
        const {UserId} = req.body;
        const user = await userModel.findById(UserId);
        if(!user) {
            throw new Error("User not found");
        }
        const panier = new panierModel ({
            user: UserId,
        });

        const addedPanier = await panier.save();
        res.status(201).json({addedPanier});

    } catch(err){
        res.status(500).json({message: err.message})
    }
};

module.exports.getPanierByUserId = async (req,res) =>{
    try{
        const userId = req.body.userId;
        console.log('userId:',userId);
        if(!userId) {
            throw new Error("userId is required");
        }
        const panier = await panierModel.findOne({user: userId}).populate('livres');
        console.log('panier:',panier);
        if (!panier)
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
        const userId = req.body.userId;
        console.log('userId:', userId);
        if(!userId) {
            throw new Error("userId is required");
        }

        const panier = await panierModel.findOne({user: userId});
        console.log('panier:', panier);
        if (!panier)
            {
                throw new Error ("panier not found !")
            }
        const livreId = req.body.livreId
        console.log('livreId:', livreId);
        panier.livres.push(livreId);
        
        const updatedPanier = await panier.save();
        res.status(200).json({updatedPanier})

    }catch(err){
        res.status(500).json({message:err.message});
    }
};

module.exports.removeLivreFromPanier = async (req,res) =>{
    try{
        const userId = req.body.userId;
        console.log('userId:', userId);

        const panier = await panierModel.findOne({user: userId});
        if (!panier)
            {
                throw new Error ("panier not found !")
            }
        const livreId = req.body.livreId;
        console.log('livreId:', livreId);

        panier.livres.pull(livreId);
        await panier.save();
        res.status(200).json("livre supprimé");
    }catch(err){
        res.status(500).json({message : err.message});
    }
}