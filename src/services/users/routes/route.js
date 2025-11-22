import Router from "express"
import { userSignUp } from "../controllers/create.controller.js";
import { loginUser } from "../controllers/login.controller.js";
import { logoutUser } from "../controllers/logoutUse.controller.js";

const router = Router()

router.post("/signup", userSignUp);
router.post("/login",loginUser);
router.post("/logout",logoutUser);



export default router