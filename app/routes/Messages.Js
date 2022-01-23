import express from "express";
import resMsg from "../controllers/ErrorsPage.js";
import { get_msg,send_msg,delete_msg } from "../controllers/MessageControler.js";

const router = express.Router();

router.get("/",get_msg);
router.post("/send",send_msg);
router.delete("/delete/:Id",delete_msg);
router.all("*", (req, res) => {
    res.status(400).json(resMsg.notValide)
})

export default router;