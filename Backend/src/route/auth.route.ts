import express, {Request, Response} from "express"
import { getMe, login, logout, signup } from "../controller/auth.controller";
import protectRoute from "../middleware/protectRoute";

const router = express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.post("/logout",logout);
router.get("/me",protectRoute, getMe);

export default router;