import express from "express";
const router = express.Router();
import {
  getArticles,
  addArticle,
  deleteArticle,
} from "../controllers/articleController.js";

router.get("/", getArticles);
router.post("/add", addArticle);
router.delete("/delete/:id", deleteArticle);

export default router;
