import express from "express";
import {
  get_all_raodmap,
  add_roadmap,
  delete_roadmap,
  update_roadmap,
} from "../controllers/RoadmapControler";
import resMsg from "../utils/ErrorsPage.js";
import { checkAdmin } from "../middlewares/authMiddlware.js";

const router = express.Router();

router.get("/:ID_cat", get_all_raodmap);

router.post("/add/:ID_Cat", checkAdmin, add_roadmap);

router.delete("/delete/:ID_cat/:IDroadmap", checkAdmin, delete_roadmap);

router.put("/update/:IDroadmap", checkAdmin, update_roadmap);

router.all("*", (req, res) => {
  res.status(400).json(resMsg.notValide);
});

export default router;
