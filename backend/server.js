import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import reportRoutes from "./routes/reportRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import rewardRoutes from "./routes/rewardRoutes.js";
import certificateRoutes from "./routes/certificateRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

const app = express();

// ✅ FIXED CORS (ONLY ONCE + PROPER CONFIG)
app.use(cors({
  origin: "https://go-clean01.netlify.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// ✅ ROUTES (NO CHANGE)
app.use("/api/report", reportRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/rewards", rewardRoutes);
app.use("/api/certificate", certificateRoutes);
app.use("/api/admin", adminRoutes);
app.use("/uploads", express.static("uploads"));

// ✅ DB CONNECTION
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// ✅ SERVER
app.listen(5000, () => {
  console.log("Server running on port 5000");
});