import express from "express";
import resMsg from "../controllers/ErrorsPage.js";
import {
  get_msg,
  send_msg,
  delete_msg,
} from "../controllers/MessageControler.js";
import { checkAdmin, checkAuth } from "../controllers/middlware.js";

const router = express.Router();

router.get("/", checkAdmin, get_msg);
router.post("/send", checkAuth, send_msg);
router.delete("/delete/:id", checkAdmin, delete_msg);
router.all("*", (req, res) => {
  res.status(400).json(resMsg.notValide);
});

export default router;
