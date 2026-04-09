import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import User from "../models/user.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/google", async (req, res) => {
  try {
    const { name, email, photo } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        photo,
        password: ""
      });
    }

    // ✅ MUST RETURN USER
    res.status(200).json({
      success: true,
      user
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});