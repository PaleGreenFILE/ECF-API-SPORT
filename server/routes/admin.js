import { signup } from "../controllers/auth.js";
import {
  update,
  deleteUser,
  getUsers,
  updateHashSync,
  getUsersbyId,
} from "../controllers/admin.js";
import express from "express";
import { verifyToken } from "../JwtTokenVerify/verifyToken.js";

const router = express.Router();

//update information members
router.put("/updateinfo/:id", verifyToken, update);

//update password
router.put("/uphash/:id", verifyToken, updateHashSync);

//add partner & structured members
router.post("/signup", signup);

//get all members information
router.get("/allusers", getUsers);

//get  members information byId
router.get("/usersbyid/:id", verifyToken, getUsersbyId);

//delete partner information
router.delete("/delete/:id", deleteUser);

export default router;
