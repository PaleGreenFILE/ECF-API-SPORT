import express from "express";
import { signin, signup } from "../controllers/auth.js";

const router = express.Router();

//SIGN IN
router.post("/signin", signin);

//REGISTER
router.post("/signup", signup);

export default router;
