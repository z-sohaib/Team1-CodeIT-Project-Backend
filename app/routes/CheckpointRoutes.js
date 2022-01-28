import express from "express";
import resMsg from "../utils/ErrorsPage.js";
import {
  get_all_checkpoint,
  add_checkpoint,
  delete_checkpoint,
  update_checkpoint,
} from "../controllers/CheckpointController.js";
import { checkAdmin, checkAuth } from "../middlewares/authMiddlware.js";

const router = express.Router();

router.get("/:Id_Roadmap", checkAuth, get_all_checkpoint);
//router.get("/:Id_checkpoint",);
router.post("/add/:Id_Roadmap", checkAdmin, add_checkpoint);
router.delete(
  "/delete/:Id_roadmap/:Id_checkpoint",
  checkAdmin,
  delete_checkpoint
);
router.put("/update/:Id_checkpoint", checkAdmin, update_checkpoint);

router.all("*", (req, res) => {
  res.status(400).json(resMsg.notValide);
});

export default router;
