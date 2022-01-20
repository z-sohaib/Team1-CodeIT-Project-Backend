import express from "express";
const router = express.router();
import {
  getArticles,
  addArticle,
  deleteArticle,
} from "../controllers/articleController";

router.get("/article", getArticles);
router.post("/article", addArticle);
router.delete("/article", deleteArticle);

export default router;
