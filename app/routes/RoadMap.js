import express from "express";
import {
  get_all_raodmap,
  add_roadmap,
  delete_roadmap,
  update_roadmap,
} from "../controllers/RoadmapControler";
import resMsg from "../controllers/ErrorsPage.js";
import { checkAdmin } from "../controllers/middlware";

const router = express.Router();

router.get("/:ID_cat", get_all_raodmap);

router.post("/add/:ID_Cat",  add_roadmap);//checkAdmin,

router.delete("/delete/:ID_cat/:IDroadmap",  delete_roadmap);//checkAdmin,

router.put("/update/:IDroadmap",  update_roadmap);//checkAdmin,

router.all("*", (req, res) => {
  res.status(400).json(resMsg.notValide);
});

export default router;
