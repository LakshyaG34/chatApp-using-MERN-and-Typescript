import express from "express"
import protectRoute from "../middleware/protectRoute";
import { getUsersForSideBar } from "../controller/userSideBar.controller";

const router = express.Router();

router.get("/", protectRoute, getUsersForSideBar);

export default router;