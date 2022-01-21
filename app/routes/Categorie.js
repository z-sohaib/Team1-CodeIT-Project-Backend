import express from "express";
import {
    get_all_cat,
    get_categorie,
    add_categorie,
    delete_categorie,
    update_categorie
} from "../controllers/CategorieControler.js";
import resMsg from "../controllers/ErrorsPage.js";

const router = express.Router();

router.get('/', get_all_cat)
router.get('/get/:IdCategorie', get_categorie)
router.post("/add", add_categorie)
router.delete("/delete/:IdCategorie", delete_categorie)
router.put("/update/:IdCategorie", update_categorie)
router.all("*",(req,res)=>{
    res.status(400).json(resMsg.notValide)
  })

export default router;