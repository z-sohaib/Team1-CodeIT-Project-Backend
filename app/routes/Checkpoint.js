import express from "express";
import resMsg from "../controllers/ErrorsPage.js";
import {
  get_all_checkpoint,
  add_checkpoint,
  delete_checkpoint,
  update_checkpoint,
} from "../controllers/CheckpointControler.js";
import { checkAdmin, checkAuth } from "../controllers/middlware.js";

const router = express.Router();

router.get("/:Id_Roadmap",  get_all_checkpoint);//checkAuth,
//router.get("/:Id_checkpoint",);
router.post("/add/:Id_Roadmap",  add_checkpoint);//checkAdmin,
router.delete(
  "/delete/:Id_roadmap/:Id_checkpoint",
  //checkAdmin,
  delete_checkpoint
);
router.put("/update/:Id_checkpoint",  update_checkpoint);//checkAdmin,

router.all("*", (req, res) => {
  res.status(400).json(resMsg.notValide);
});

export default router;
