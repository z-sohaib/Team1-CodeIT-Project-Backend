import express from "express";
const router = express.Router();
import {
  admin_signup,
  admin_login,
  admin_logout,
  delete_admin_account,
} from "../controllers/adminController";
import { checkAdmin } from "../controllers/middlware";

router.post("/signup", checkAdmin, admin_signup);
router.post("/login", admin_login);
router.get("/logout", admin_logout);
router.delete("/delete/:id", checkAdmin, delete_admin_account);

export default router;
