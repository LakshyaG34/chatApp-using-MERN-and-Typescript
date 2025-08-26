import express from "express"
import protectRoute from "../middleware/protectRoute";
import { getMessage, sendMessage } from "../controller/message.controller";

const router = express.Router();

router.post("/send/:id", protectRoute, sendMessage);
router.get("/:id", protectRoute, getMessage);

export default router;