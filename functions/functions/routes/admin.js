import {
  activeAdmin,
  deleteAdmin,
  disableAdmin,
  getAllUsers,
  updateAdmin,
  updateHashSyncAdmin,
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
//update Admin password
router.put("/uphash/:id", updateHashSyncAdmin);


// Partners //
// Active Admin Partners enable
router.put("/enable-partners/:id");
// Disable Partners disable
router.put("/disable-partners/:id");
//Edit Partners information
router.put("/update-partners/:id");
//update Partners password
router.put("/uphash-partners/:id");


// Structures //
// Active Structures Status enable
router.put("/enable-structures/:id");
// Disable Structures Status disable
router.put("/disable-structures/:id");
//Edit Structures information
router.put("/update-structures/:id");
//update Structures password
router.put("/uphash-structures/:id");


// ROUTES GET //
// Get All members information
router.get("/allusers", getAllUsers);
// Get partners members information
router.get("/partners");
//get structures members information
router.get("/structures");
//View  Admin information byId
router.get("/view-admin/:id");
//View  Partners information byId
router.get("/view-partners/:id");
//View  Structures information byId
router.get("/view-structures/:id");


//delete partner information
router.delete("/delete-admin/:id", deleteAdmin);
router.delete("/delete-partners/:id");
router.delete("/delete-structures/:id");


export default router;
