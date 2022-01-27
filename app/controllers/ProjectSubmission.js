import Project from "../models/ProjectSubmission.js";
import resMsg from "../controllers/ErrorsPage.js";

export function get_all(req, res) {
    try {
        Project.find()
            .exec()
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(404).json(resMsg.notFound);
            });
    } catch (error) {
        res.status(500).json(resMsg.errorIntern)
    }
}

export function add_project(req, res) {
    try {
        const project = new Project({
            user_id: req.body.user_id,
            roadmap_id: req.params.Id_Roadmap,
            checkpoint_id: req.params.Id_Checkpoint,
            projectlink: req.body.projectlink
        })
        project.save();
        res.status(201).json(project);
    } catch (error) {
        res.status(500).json(resMsg.errorIntern)
    }
}

export function delete_project(req, res) {
    try {
        const id = req.params.Id;
        Project.remove({ _id: id }).exec()
        .then(result=>{
            res.status(201).json(result)
        })
        .catch(err => {res.status(404).json(resMsg.notFound); })
    } catch (error) {
        res.status(500).json(resMsg.errorIntern)
    }
}