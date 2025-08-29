import express from "express"
import protectRoute from "../middleware/protectRoute";
import { getUsersForSideBar, getUsersProfilePic } from "../controller/userSideBar.controller";

const router = express.Router();

router.get("/", protectRoute, getUsersForSideBar);
router.get("/profile-pic/:id", protectRoute, getUsersProfilePic);

export default router;