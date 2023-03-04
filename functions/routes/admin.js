import {
  activeAdmin,
  deleteAdmin,
  disableAdmin,
  getUsersbyId,
  getAllUsers,
  registerAdmin,
  registerStructures,
  registerPartners,
  updateAdmin,
  updateUserInfoPartnerStructure,
  getAllPartners,
  getStructureByPartnerById,
} from "../controllers/admin.js";
import express from "express";

const router = express.Router();

// Routes PUT //

// Admin //
// Active Admin Status enable
router.put("/enable/:id", activeAdmin);
// Disable Admin Status disable
router.put("/disable/:id", disableAdmin);
//Edit Admin information
router.put("/updateinfo/:id", updateAdmin);
//Edit Partner, Structure information
router.put("/update/:id", updateUserInfoPartnerStructure);

// ROUTES GET //
// Get All members information
router.get("/allusers", getAllUsers);

// Get All partner information
router.get("/all_partners", getAllPartners);

// Get partners members information
router.get("/partners/:id");

//get structures members information
router.get("/structures/:id", getStructureByPartnerById);

//View  Partners || Structures information byId
router.get("/users/:id", getUsersbyId);

//ROUTE REGISTER ADMIN
router.post("/register_admin", registerAdmin);
router.post("/register_partners", registerPartners);
router.post("/register_structures", registerStructures);

// ROUTES DELETE //

//delete partner information
router.delete("/delete/:id", deleteAdmin);

export default router;
