  import express from "express";
  
  const router = express.Router();

  //Routes PUT update password
   router.put("/uphash/:id");

  // ROUTES GET //
  // Get All My structures members Informations
  router.get("/structures/:id");
  //View  My structures Informations byId
  router.get("/view/:id");
  
  export default router;
  