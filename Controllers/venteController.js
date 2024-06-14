const venteModel = require('../Models/venteModel');

module.exports.addVente = async(req,res) =>{
    try {
        const vente = new venteModel(req.body);
        const AddedVente = await vente.save();
        res.status(201).json({AddedVente})

    } catch(err){
        res.status(500).json({message: err.message});

    }
}
module.exports.getVentes = async (req,res)=> {
    try{
        const ventes =await venteModel.find();
        if(ventes.length===0 && !ventes) {
            throw new Error ("no sales found !");
        }
        res.status(201).json({ventes});
    } catch(err) {
        res.status(500).json({message : err.message});
    }
};

module.exports.getVenteById = async (req,res)=>{
    try{
        const {id} = req.params;
        const ventes = await venteModel.findById(id);
        if(ventes.length ===0 && !ventes){
            throw new Error ("no sales found !");
        }
        res.status(201).json({ventes});
    } catch(err){
        res.status(500).json({message : err.message});
    }
};

module.exports.annulerVente = async (req,res) =>{
    try{
        const {id} = req.params;
        const checkIfVenteExists = await venteModel.findById(id);
        if(!checkIfVenteExists)
            {
                throw new Error ("vente not found ! ");
            }
        await venteModel.findByIdAndDelete(id);
        res.status(201).jeson("vente annulée");
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}