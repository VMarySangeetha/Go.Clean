import User from "../models/user.js";

export const getUserCoins = async (req, res) => {

  try {

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json({
      coins: user.coins
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Error fetching coins"
    });

  }

};