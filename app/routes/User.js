import express from "express";
const router = express.Router();
import { getUser, getNotifications } from "../controllers/userControllers";
import { checkAuth } from "../controllers/middlware.js";

router.get("/profile/:id", getUser);
router.get("/notification", checkAuth, getNotifications);

export default router;
