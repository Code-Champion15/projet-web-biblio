const Livre = require("../Models/livreModel");
module.exports.addLivre = async(req,res) =>{
    const{ titre,auteur,prix,etat,descreption }=req.body;
    console.log(req.body);
    try{
        const livre = new livreModel(req.body);
        const addedLivre = await livre.save();
        res.status(201).json({addedLivre});
    } catch(err){
        res.status(500).json({message : err.message});
    }
};
module.exports.getLivres = async(req,res) =>{
    try{
        const livres = await livreModel.find();
        if(livres.length === 0 && !livres) {
            throw new Error ("No books found");
        }
        res.status(200).json({livres});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}
module.exports.getLivresByID = async(req,res) =>{
    try{
        const {id}=req.params;
        const livres = await livreModel.findById(id);
        if (livres.length===0 && !livres){
            throw new Error ("no books found");
        }
        res.status(200).json({livres});

    } catch (err){
        res.status(500).json({message : err.message});
    }
}

module.exports.addLivreWithImage = async(req,res) =>{
    const {titre, auteur, prix, etat,description} = req.body;
    const {filename} = req.file;
    console.log(req.body);
    try{
        const livre = new livreModel({
            titre, auteur, prix, etat, description, image_livre: filename
        });
        const addedLivre = await livre.save();
    res.status(201).json({addedLivre});        
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
};
module.exports.updateLivre = async(req,res) =>{
    try{
        const {id} =res.params;
        const {titre, auteur, prix, etat,description } = req.body;
    
        const checkIfBookrExists = await livreModel.findById(id);
        if(!checkIfBookExists)
            {
                throw new Error ("book not found !")
            }
        updated = await livreModel.findByIdAndUpdated(
            id, {
                $set:{ titre , auteur, prix, etat, description}
            },
            {new : true}
        )
        res.status(201).json({updated});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports.deleteLivre = async (req,res) => {
    try{
        const {id}= req.params;
        const checkIfBookExists = await livreModel.findById(id);
        if(!checkIfBookExists)
            {
                throw new Error("Book not found !")
            }
        await livreModel.findByIdAndDeleted(id);
        res.status(200).json("deleted");
    }catch (err) {
        res.status(500).json({message: err.message})
    };
}

