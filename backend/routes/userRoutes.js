import express from "express";
import { getUserCoins } from "../controllers/userController.js";

const router = express.Router();

router.get("/:id/coins", getUserCoins);

export default router;