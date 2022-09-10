  import express from "express";
  
  const router = express.Router();
  
  //Routes PUT update password
  router.put("/uphash/:id");
  
  // ROUTES GET //
  //get My Structure Informations
  router.get("/structure/:id");
  
  export default router;
  