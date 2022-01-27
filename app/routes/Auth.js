import express from "express";
const router = express.Router();
import {
  signup,
  login,
  logout,
  checkAdmin,
  tokenRefresh,
} from "../controllers/authController";

router.post("/signup", checkAdmin, signup);
router.post("/login", login);
router.get("/logout", logout);
router.get("/token", tokenRefresh);

export default router;
