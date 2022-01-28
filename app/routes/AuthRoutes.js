import express from "express";
const router = express.Router();
import {
  signup,
  login,
  logout,
  tokenRefresh,
} from "../controllers/authController";
import { checkAdmin } from "../middlewares/authMiddlware.js";

router.post("/signup", checkAdmin, signup);
router.post("/login", login);
router.get("/logout", logout);
router.get("/token", tokenRefresh);

export default router;
