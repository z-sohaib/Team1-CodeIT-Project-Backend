import express from "express";
const router = express.Router();
import {
  getArticles,
  addArticle,
  deleteArticle,
} from "../controllers/articleController.js";
import { checkAdmin, checkAuth } from "../controllers/authController.js";

router.get("/:cat?/:limit?", checkAuth, getArticles);
router.post("/add", checkAdmin, addArticle);
router.delete("/delete/:id", checkAdmin, deleteArticle);

export default router;
