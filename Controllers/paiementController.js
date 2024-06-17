const paiementModel = require('../Models/paiementModel');
const commandeModel = require('../Models/commandeModel');

module.exports.addPaiement = async (req, res) =>{
    try{
        const paiement = new paiementModel(req.body);
        const addedPaiement = paiement.save();
        await commandeModel.findByIdAndUpdate(req.body.commande, {etat: 'payée'});
        res.status(201).json({addedPaiement});
    } catch(err){
        res.status(500).json({message: err.message});
    }
};

module.exports.getPaiement = async (req,res) =>{
    try{
        const paiements = await paiementModel.find().populate('commande');
        res.status(200).json({paiements});
    } catch(err){
        res.status(500).json({message: err.message});
    }
};
