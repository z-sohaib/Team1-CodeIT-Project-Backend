import express from "express";
import {
  get_all_cat,
  get_categorie,
  add_categorie,
  delete_categorie,
  update_categorie,
} from "../controllers/CategorieControler.js";
import resMsg from "../controllers/ErrorsPage.js";
import { checkAdmin, checkAuth } from "../controllers/middlware.js";

const router = express.Router();

router.get("/", get_all_cat);
router.get("/get/:id",  get_categorie);//checkAuth,
router.post("/add",  add_categorie);//checkAdmin,
router.delete("/delete/:id",  delete_categorie);//checkAdmin,
router.put("/update/:id",  update_categorie);//checkAdmin,
router.all("*", (req, res) => {
  res.status(400).json(resMsg.notValide);
});

export default router;
