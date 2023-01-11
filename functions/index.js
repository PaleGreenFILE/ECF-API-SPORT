import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import partnersRoutes from "./routes/partners.js";
import structuresRoutes from "./routes/structures.js";
import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import * as functions from "firebase-functions";

const app = express();
dotenv.config();

const options = {
  origin: [
    "https://ecf-2022-21611.web.app",
    "https://us-central1-ecf-2022-21611.cloudfunctions.net/NodeJsServerEcf",
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:5000",
  ],
  credentials: true,
  optionSuccessStatus: 200,
};

//Init express , api/routes , cookie-parser
app.use(cors(options));
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));

// Server API Routes
app.use("/", authRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/partners", partnersRoutes);
app.use("/api/structures", structuresRoutes);

// Server Init Error
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

// Server Connect
//  const port = 8080;
//  app.listen(port, () => {
//  console.log("Server Connected!");
//  });

export const NodeJsServerEcf = functions.https.onRequest(app);
