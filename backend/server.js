import express from "express";
import User from "../models/user.js";

const router = express.Router();

// ✅ GOOGLE LOGIN ROUTE
router.post("/google", async (req, res) => {
  try {
    const { name, email, photo } = req.body;

    // check if user exists
    let user = await User.findOne({ email });

    // if not → create user
    if (!user) {
      user = await User.create({
        name,
        email,
        photo,
        password: ""
      });
    }

    // ✅ RETURN USER (VERY IMPORTANT)
    res.status(200).json({
      success: true,
      user
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error"
    });
  }
});

export default router; 