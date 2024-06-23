const commandeModel = require('../Models/commandeModel');
const livreModel = require('../Models/livreModel');
const panierModel = require('../Models/panierModel');
const userModel = require('../Models/userModel');


module.exports.addCommande = async (req, res) => {
    //"livres":[]
    //"userId":

    try {
        const userId = req.body.userId;
        console.log('userId:', userId);
        if (!userId) {
            throw new Error("userId is required");
        }
        const panier = await panierModel.findOne({ user: userId });
        console.log('panier:', panier);
        if (!panier) {
            throw new Error("panier not found !")
        }
        const commande = new commandeModel({
            user: req.body.userId,
            livres: panier.livres,
        });
        const addedCommande = await commande.save();
        await livreModel.updateMany({ _id: { $in: panier.livres } }, { vendu: true });
        panier.livres = [];
        await panier.save();

        res.status(201).json({ addedCommande })

    } catch (err) {
        res.status(500).json({ message: err.message });

    }
};


module.exports.getCommandes = async (req, res) => {
    try {
        const commandes = await commandeModel.find().populate('livres');
        if (commandes.length === 0 && !commandes) {
            throw new Error("no commande found !");
        }
        res.status(201).json({ commandes });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports.getCommandeById = async (req, res) => {
    try {
        const { id } = req.params;
        const commandes = await commandeModel.findById(id).populate('user');
        if (commandes.length === 0 && !commandes) {
            throw new Error("no commandes found !");
        }
        res.status(201).json({ commandes });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports.getCommandeByEtat = async (req, res) => {
    try {
        const etat = req.params.etat;
        if (!etat) {
            throw new Error('cet etat n existe pas ')
        }
        // || commandes.length === 0   !commandes
        const commandes = await commandeModel.find({ etat: etat }).populate('livres')
        if (commandes.length === 0) {
            throw new Error('aucune commande trouvée dans cet etat ')
        }
        res.status(201).json({ commandes });
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
};
// exemple: http://localhost:5000/commandes/getCommandeByEtat/en attente

module.exports.updateCommande = async (req, res) => {
    try {
        const commande = await commandeModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (commande.length === 0 && !commande) {
            throw new Error("no commandes found !");
        }
        res.status(200).json({ commande });
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
};

// module.exports.annulerCommande = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const checkIfCommandeExists = await commandeModel.findById(id);
//         if (!checkIfCommandeExists) {
//             throw new Error("commande not found ! ");
//         }
//         await livreModel.updateMany(
//             { _id: { $in: commande.livres } },
//             { vendu: false }
//         );
//         await commandeModel.findByIdAndDelete(id);

//         res.status(201).json('commande supprimé et listes livres mis a jour')
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// }

module.exports.annulerCommande = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Commande ID:', id);
        const commande = await commandeModel.findById(id).populate('livres');
        console.log('Commande:', commande);

        if (!commande) {
            throw new Error("Commande not found!");
        }

        await livreModel.updateMany(
            { _id: { $in: commande.livres } },
            { vendu: false }
        );

        await commandeModel.findByIdAndDelete(id);

        res.status(201).json('Commande supprimée et livres mis à jour');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
