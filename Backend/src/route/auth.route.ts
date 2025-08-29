import express, {Request, Response} from "express"
import { getMe, login, logout, signup } from "../controller/auth.controller";
import protectRoute from "../middleware/protectRoute";
import { upload } from "../middleware/protectImageRoute";

const router = express.Router();

router.post("/signup",upload.single("profilePic"), signup);
router.post("/login",login);
router.post("/logout",logout);
router.get("/me",protectRoute, getMe);

export default router;