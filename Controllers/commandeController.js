const commandeModel = require('../Models/commandeModel');
const livreModel = require('../Models/livreModel');

module.exports.addCommande = async(req,res) =>{
    try {
        const panier = req.body.livres;
        const commande = new commandeModel({user: req.user._id, livres: panier});
        const AddedCommande = await commande.save();
        await livreModel.updateMany({_id: { $in: panier}}, {vendu: true});
        res.status(201).json({AddedCommande})

    } catch(err){
        res.status(500).json({message: err.message});

    }
};

module.exports.getCommandes = async (req,res)=> {
    try{
        const commandes =await commandeModel.find({user: req.user._id}).populate('livres');
        if(commandes.length===0 && !commandes) {
            throw new Error ("no commande found !");
        }
        res.status(201).json({commandes});
    } catch(err) {
        res.status(500).json({message : err.message});
    }
};

module.exports.getCommandeById = async (req,res)=>{
    try{
        const {id} = req.params;
        const commandes = await commandeModel.findById(id);
        if(commandes.length ===0 && !commandes){
            throw new Error ("no commandes found !");
        }
        res.status(201).json({commandes});
    } catch(err){
        res.status(500).json({message : err.message});
    }
};

module.exports.updateCommande = async (req,res) => {
    try{
        const commande = await commandeModel.findByIdAndUpdate(req.params.id,req.body, { new: true, runValidators: true});
        if(commande.length ===0 && !commande){
            throw new Error ("no commandes found !");
        }
        res.status(200).json({commande});
    } catch (err) {
        res.status(500).json({message : err.message})
    }
};

module.exports.annulerCommande = async (req,res) =>{
    try{
        const {id} = req.params;
        const checkIfCommandeExists = await commandeModel.findById(id);
        if(!checkIfCommandeExists)
            {
                throw new Error ("commande not found ! ");
            }
        await commandeModel.findByIdAndDelete(id);
        res.status(201).jeson("commande supprimé");
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}