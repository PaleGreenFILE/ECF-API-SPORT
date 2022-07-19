import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
dotenv.config();

const options = {
  origin: [
    "http://localhost:3000",
    "http://localhost:8880",
    "https://ecf-2022.web.app",
    "https://ecf-2022.herokuapp.com",
  ],
  credentials: true,
  optionSuccessStatus: 200,
};
//Init express , api/routes , cookie-parser
app.use(cors(options));
app.use(cookieParser());
app.use(express.json());

// Server API Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

//Server Connect
const port = process.env.PORT || 8800;
app.listen(port, () => {
  console.log("Server Connected!");
});
