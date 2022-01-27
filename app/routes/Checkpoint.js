import express from "express";
import resMsg from "../controllers/ErrorsPage.js";
import { get_all_checkpoint,add_checkpoint,delete_checkpoint,update_checkpoint } from "../controllers/CheckpointControler.js";

const router = express.Router();

router.get("/:Id_Roadmap",get_all_checkpoint);
//router.get("/:Id_checkpoint",);
router.post("/add/:Id_Roadmap",add_checkpoint);
router.delete("/delete/:Id_roadmap/:Id_checkpoint",delete_checkpoint);
router.put("/update/:Id_checkpoint",update_checkpoint);

router.all("*", (req, res) => {
    res.status(400).json(resMsg.notValide)
})


export default router;
