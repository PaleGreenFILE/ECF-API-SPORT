import { activeAdmin, deleteAdmin, disableAdmin, getAllUsers, updateAdmin, updateHashSyncAdmin } from '../controllers/admin.js';
import express from 'express';

const router = express.Router();

// Routes PUT //
// Admin //
// Active Admin Status enable
router.put('/enable/:id', activeAdmin);
// Disable Admin Status disable
router.put('/disable/:id', disableAdmin);
//Edit Admin information
router.put('/updateinfo/:id', updateAdmin);
//update Admin password
router.put('/uphash/:id', updateHashSyncAdmin);

// ROUTES GET //
// Get All members information
router.get('/allusers', getAllUsers);
// Get partners members information
router.get('/partners');
//get structures members information
router.get('/structures');
//View  Partners information byId
router.get('/view-partners/:id');
//View  Structures information byId
router.get('/view-structures/:id');

// ROUTES DELETE //
//delete partner information
router.delete('/delete/:id', deleteAdmin);

export default router;
