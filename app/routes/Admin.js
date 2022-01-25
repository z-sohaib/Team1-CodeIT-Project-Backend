import express from "express";
const router = express.Router();
import {
  admin_signup,
  admin_login,
  delete_admin_account,
} from "../controllers/adminController";

router.post("/signup", admin_signup);
router.post("/login", admin_login);
router.delete("/delete/:id", delete_admin_account);

export default router;