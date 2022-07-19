import express from "express";
import { signin, signup } from "../controllers/auth.js";

const router = express.Router();

//SIGN IN
router.post("/signin", signin);

//REGISTER
router.post("/signup", signup);

// INIT SERVER
router.get("/", (req, res) => {
  res.send(
    "Success to connect to the server, your application will be automatically running!"
  );
});

export default router;
