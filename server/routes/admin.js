import { signup } from "../controllers/auth.js";
import {
  update,
  deleteUser,
  getUsers,
  updateHashSync,
  getUsersbyId,
  disable,
} from "../controllers/admin.js";
import express from "express";
import { verifyToken } from "../JwtTokenVerify/verifyToken.js";
import { active } from './../controllers/admin';

const router = express.Router();

// Active user Status enable 
router.put("/enable/:id", verifyToken, active);

// Disable user Status disable 
router.put("/disable/:id", verifyToken, disable);

//Edit information members
router.put("/updateinfo/:id", verifyToken, update);

//update password
router.put("/uphash/:id", verifyToken, updateHashSync);

//add partner & structured members
router.post("/signup", signup);

//get all members information
router.get("/allusers",verifyToken, getUsers);

//View  members information byId
router.get("/usersbyid/:id", verifyToken, getUsersbyId);

//delete partner information
router.delete("/delete/:id",verifyToken, deleteUser);

export default router;
