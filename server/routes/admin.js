import { signup } from "../controllers/auth.js";
import {
  update,
  deleteUser,
  getUsers,
  updateHashSync,
  getUsersbyId,
  disable,
  active,
  getStructure,
} from "../controllers/admin.js";
import express from "express";
import { verifyToken } from "../JwtTokenVerify/verifyToken.js";

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

//get partner members information
router.get("/allusers", verifyToken, getUsers);

//get structure members information
router.get("/structure", verifyToken, getStructure);

//View  members information byId
router.get("/usersbyid/:id", verifyToken, getUsersbyId);

//delete partner information
router.delete("/delete/:id", verifyToken, deleteUser);

export default router;
