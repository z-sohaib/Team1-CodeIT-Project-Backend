import Checkpoint from "../models/Checkpoint.js"
import Roadmap from "../models/Roadmap.js"
import resMsg from "../controllers/ErrorsPage.js";

export async function get_all_checkpoint(req, res) {
    const Id_roadmap = req.params.Id_Roadmap;
    try {
        const roadmap = await Roadmap.findOne({ _id: Id_roadmap });
        if (roadmap !== null) {
            const Result = [];
            roadmap.listofcheckpoint?.forEach(item => {
                Checkpoint.findOne({ _id: item._id })
                    .exec()
                    .then(result => {
                        Result.push(result);
                    })
                    .catch(err => {
                        res.status(404).json(resMsg.notFound)
                    })
                if (Result.length === roadmap.listofcheckpoint.length) {
                    res.status(200).json(alpha);
                }
            })
        }
    } catch (error) {
        res.status(500).json(resMsg.errorIntern)
    }
}
/*
export function get_checkpoint(req, res) {
    const id = req.params.Id_Roadmap;
    Checkpoint.findOne({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(404).json(resMsg.notFound)
        })
}
*/
export async function add_checkpoint(req, res) {
    const Id_Roadmap = req.params.Id_Roadmap;
    try {
        if (req.body.name !== null && req.body.number !== null && req.body.expvalue !== null && req.body.listOfprimarylinks !== []) {
            if (req.body.quizz !== [] || req.body.project !== null) {
                const checkpoint = new Checkpoint({
                    name: req.body.name,
                    number: req.body.number,
                    expvalue: req.body.expvalue,
                    listOfprimarylinks: req.body.listOfprimarylinks,
                    listofsecondarylinks: req.body.listofsecondarylinks,
                    project: req.body.project,
                })
                req.body.quizz?.forEach(element => {
                    checkpoint.quizz.push(element)
                })
                Roadmap.findOne({ _id: Id_Roadmap }).exec().then(async roadmap => {
                    roadmap.listofcheckpoint.push({ _id: checkpoint._id });
                    roadmap.save();
                    checkpoint.save();
                    res.status(201).json(checkpoint);
                }).catch(err => res.status(404).json(err.message));



            } else {
                res.status(400).json({ "message": "Quizz && project ==null" })
            }
        } else {
            res.status(404).json(resMsg.notValide)
        }

    } catch (error) {
        res.status(500).json(resMsg.errorIntern)
    }
}

export function delete_checkpoint(req, res) {
    const Id_roadmap = req.params.Id_roadmap;
    const Id_checkpoint = req.params.Id_checkpoint;
    try {
        Roadmap.findOne({ _id: Id_roadmap }).exec().then(roadmap => {
            const newlist = roadmap.listofcheckpoint?.filter(item => item._id.toString() !== Id_checkpoint);
            roadmap.listofcheckpoint = newlist;
            roadmap.save();
            Checkpoint.deleteOne({ _id: Id_checkpoint }).exec()
                .then(result => {
                    res.status(200).json(result);
                })
                .catch(error => {
                    res.status(404).json(resMsg.notFound)
                });


        }).catch(err => {
            res.status(404).json(resMsg.notFound)
        })

    } catch (error) {
        res.status(500).json(error.message)
    }
}

export function update_checkpoint(req, res) {
    const Id_checkpoint = req.params.Id_checkpoint;

    try {
        Checkpoint.findOne({ _id: Id_checkpoint })
            .exec()
            .then(element => {
                req.body.name ? element.name = req.body.name : element.name = element.name;
                req.body.number ? element.number = req.body.number : element.number = element.number;
                req.body.expvalue ? element.expvalue = req.body.expvalue : element.expvalue = element.expvalue;
                req.body.listOfprimarylinks ? req.body.listOfprimarylinks?.forEach(item => {
                    element.listOfprimarylinks.push(item)
                }) : element.listOfprimarylinks;
                req.body.listofsecondarylinks ? req.body.listofsecondarylinks?.forEach(item => {
                    element.listofsecondarylinks.push(item)
                }) : element.listofsecondarylinks;
                req.body.quizz ? req.body.quizz?.forEach(item => {
                    element.quizz.push(item)
                }) : element.quizz;
                req.body.project ? element.project = req.body.project : element.project;
                element.save();
                res.status(201).json(element);
            })
            .catch(error => res.status(500).json(error.message));
    } catch (error) {
        res.status(500).json(error.message)
    }
}