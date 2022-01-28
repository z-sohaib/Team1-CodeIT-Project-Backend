import express from "express";
const router = express.Router();
import {
  getArticles,
  addArticle,
  deleteArticle,
} from "../controllers/articleController.js";
import { checkAdmin } from "../controllers/middlware.js";

router.get("/", getArticles);
router.post("/add", checkAdmin, addArticle);
router.delete("/delete/:id", checkAdmin, deleteArticle);

export default router;
