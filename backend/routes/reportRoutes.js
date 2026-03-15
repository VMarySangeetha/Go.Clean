import express from "express";
import multer from "multer";

import {
  createReport,
  getReports,
  updateReportStatus,
  getUserReports
} from "../controllers/reportController.js";

const router = express.Router();


// STORAGE CONFIG FOR IMAGE UPLOAD
const storage = multer.diskStorage({

  destination: "uploads/",

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }

});

const upload = multer({ storage });


// CREATE REPORT
router.post("/", upload.single("image"), createReport);


// GET ALL REPORTS (ADMIN)
router.get("/reports", getReports);


// UPDATE REPORT STATUS (ADMIN / WORKER)
router.patch("/:id/status", updateReportStatus);


// GET REPORTS OF A SPECIFIC USER (CITIZEN TRACKING)
router.get("/user/:userId", getUserReports);


export default router;