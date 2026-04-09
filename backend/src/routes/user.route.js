import { Router } from "express";
import { registerUser, loginUser, LogoutUser } from "../controllers/user.controller.js";
const router = Router();
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(LogoutUser);

export default router;