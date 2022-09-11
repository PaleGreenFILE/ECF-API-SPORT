import express from "express";
import { signinAdmin, registerAdmin, logout, firstConnexionPartners, firstConnexionStructures, registerStructures, registerPartners } from "../controllers/auth.js";
import { verifyToken } from "../JwtTokenVerify/verifyToken.js";

const router = express.Router();

// Invoke one Time verify token on all route Api //
router.all("/api/admin", verifyToken)
router.all("/api/partners", verifyToken)
router.all("/api/structures", verifyToken)

// First connexion by id for Partners & Structures For change Password
router.put("/first-login-partners/:id", firstConnexionPartners);
router.put("/first-login-structures/:id", firstConnexionStructures);

//LOGIN ADMIN Partner & Structures
router.post("/login", signinAdmin );

//ROUTE REGISTER ADMIN 
router.post("/register_admin", registerAdmin);
router.post("/register_partners", registerPartners);
router.post("/register_structures", registerStructures);

//ROUTE LOGOUT For All Users
router.post("/logout", logout);

// INIT SERVER
router.get("/", (req, res) => {
  res.send(
    "Success to connect to the server, your application will be automatically running!"
  );
});

export default router;
