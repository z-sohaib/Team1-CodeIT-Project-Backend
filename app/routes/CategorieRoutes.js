import express from "express";
import {
  get_all_cat,
  get_categorie,
  add_categorie,
  delete_categorie,
  update_categorie,
} from "../controllers/CategorieControler.js";
import resMsg from "../controllers/ErrorsPage.js";
import { checkAdmin, checkAuth } from "../middlewares/authMiddlware.js";

const router = express.Router();

router.get("/", get_all_cat);
router.get("/get/:id", checkAuth, get_categorie);
router.post("/add", checkAdmin, add_categorie);
router.delete("/delete/:id", checkAdmin, delete_categorie);
router.put("/update/:id", checkAdmin, update_categorie);
router.all("*", (req, res) => {
  res.status(400).json(resMsg.notValide);
});

export default router;
