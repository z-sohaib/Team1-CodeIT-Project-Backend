import RoadMap from "../models/Roadmap.js";
import Categorie from "../models/Categorie.js";
import Checkpoint from "../models/Checkpoint";
import resMsg from "../controllers/ErrorsPage.js";

export async function get_all_raodmap(req, res) {
    try {
        const id = req.params.ID_cat;
        const categorie = await Categorie.findOne({ _id: id });
        if (categorie !== null) {
            const result = categorie.listofroadmap;
            const alpha = [];   // list that has all my roadmap of this
            result.forEach(async element => {
                await RoadMap.findOne({ _id: element._id }).exec()
                    .then(result => {
                        alpha.push(result);
                    })
                    .catch(error => {
                        res.status(404).json(resMsg.notFound)
                    });
                if (alpha.length === result.length) {
                    res.status(200).json(alpha);
                }
            });

        } else {
            res.status(404).json(resMsg.notFound)
        }
    } catch (error) {
        res.status(500).json(resMsg.errorIntern)
    }
}

export async function add_roadmap(req, res) {
    try {
        const id_cat = req.params.ID_Cat;
        if (req.body.Name !== null) {
            const roadmap = new RoadMap({
                name: req.body.name,
                listofcheckpoint: [],
            });
            const cat = await Categorie.findOne({ _id: id_cat });
            if (cat !== null) {
                cat.listofroadmap.push(roadmap._id);
                cat.save();
                roadmap.save();
                res.status(201).json(roadmap);
            } else {
                res.status(404).json(resMsg.notFound)
            }

        } else {
            res.status(400).json(resMsg.notValide)
        }

    } catch (error) {
        res.status(500).json(resMsg.errorIntern)
    }
}

export async function delete_roadmap(req, res) {
    try {
        // getting the params
        const id_cat = req.params.ID_cat;
        const id = req.params.IDroadmap;
        //delete the id of roadmap from "categorie.ListOfRoadmap"
        const cat = await Categorie.findOne({ _id: id_cat });
        if (cat !== null) {
            const newlist = cat.listofroadmap.filter(item => item._id.toString() !== id);
            cat.listofroadmap = newlist;
            cat.save();
            // I have to delete the checkpoints of this Roadmap!
            const roadmap = RoadMap.findOne({ _id: id });
            if (roadmap !== null) {
                roadmap.listofcheckpoint?.forEach(async element => {
                    await Checkpoint.deleteOne({ _id: element._id })
                })

                //Now, we will delete the Roadmap document!!
                RoadMap.deleteOne({ _id: id }).exec()
                    .then(result => {
                        res.status(200).json(result);
                    })
                    .catch(error => {
                        res.status(404).json(resMsg.notFound)
                    });
            } else {
                res.status(404).json(resMsg.notFound)
            }

        } else {
            res.status(404).json(resMsg.notFound)
        }

    } catch (error) {
        res.status(500).json(error.message)
    }
}

export function update_roadmap(req, res) {
    // getting Params
    const id = req.params.IDroadmap;
    //updating the doc!
    try {
        const roadmap = RoadMap.findOne({ _id: id })
            .exec()
            .then(roadmap => {
                if (roadmap !== null) {
                    roadmap.name = req.body.name;
                    roadmap.save();
                    res.status(200).json(roadmap)
                } else {
                    res.status(404).json(resMsg.notFound)
                }
            })
            .catch(error => res.status(500).json(error.message));

    } catch (err) {
        res.status(500).json(resMsg.errorIntern)
    }
}
