import Categorie from "../models/Categorie.js";
import Roadmap from "../models/Roadmap.js";
import Article from "../models/Article";
import resMsg from "../controllers/ErrorsPage.js";

export function get_all_cat(req, res) {
    try {
        Categorie.find().exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(404).json(resMsg.notFound);
        });
    } catch (error) {
        res.status(500).json(resMsg.errorIntern)
    }
}

export function get_categorie(req, res) {
    try {
        const id = req.params.id;
        Categorie.find({ _id: id }).exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(404).json(resMsg.notFound);
        });
    } catch (error) {
        res.status(500).json(resMsg.errorIntern)
    }
}

export async function add_categorie(req, res) {
    try {
        const categorie = new Categorie({
            name: req.body.name,
            listofroadmap: [],
        });
        categorie.save();
        return res.status(201).json(categorie);
    } catch (error) {
        res.status(500).json(resMsg.errorIntern);
    }
}

export async function delete_categorie(req, res) {
    try {
        // geting the params
    const id = req.params.id;
    //I have to delete the roadmaps/articles of this categorie
    const cat=await Categorie.findOne({_id:id});
    const List1=cat.listofroadmap;
    List1.forEach(async element=>{
        await Roadmap.deleteOne({_id:element._id})
    })
    //deleting this categorie doc!
    Categorie.remove({ _id: id }).exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(500).json(resMsg.errorIntern);
        });
    } catch (error) {
        res.status(500).json(resMsg.errorIntern)
    }
}

export function update_categorie(req, res) {
    try {
        const id = req.params.IdCategorie;
    Categorie.findOne({ _id: id }, (err, object) => {
        if (err) {
            res.status(404).json(resMsg.notFound);
        } else {
            if (req.body.name) {
                object.name = req.body.name;
            }
            if (req.body.listofroadmap) {
                object.listofroadmap = req.body.listofroadmap;
            }
            object.save((err, succes) => {
                if (err) {
                    res.status(500).json(resMsg.errorIntern)
                } else {
                    res.status(201).json(succes);
                }
            });
        }
    })
    } catch (error) {
        res.status(500).json(resMsg.errorIntern)
    }
}