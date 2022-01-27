import express from "express";
import resMsg from "../controllers/ErrorsPage.js";
import { get_all,add_project,delete_project } from "../controllers/ProjectSubmission.js";
const router= express.Router();

router.get("/",get_all);
router.delete("/delete/:Id",delete_project)
router.post("/add/:Id_Roadmap/:Id_Checkpoint",add_project)
router.all("*", (req, res) => {
    res.status(400).json(resMsg.notValide)
})

export default router;