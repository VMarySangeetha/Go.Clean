import User from "../models/user.js";
import Report from "../models/Report.js";

export const getUserReports = async (req, res) => {

  try {

    const reports = await Report.find({
      userId: req.params.id
    }).sort({ createdAt: -1 });

    res.json(reports);

  } catch (error) {

    res.status(500).json({
      message: "Error fetching reports"
    });

  }

};
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