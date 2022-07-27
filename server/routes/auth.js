import express from "express";
import { signin, signup, logout } from "../controllers/auth.js";

const router = express.Router();

//SIGN IN
router.post("/signin", signin);

//REGISTER
router.post("/signup", signup);

//LOGOUT
router.post("/logout", logout);

// INIT SERVER
router.get("/", (req, res) => {
  res.send(
    "Success to connect to the server, your application will be automatically running!"
  );
});

export default router;
