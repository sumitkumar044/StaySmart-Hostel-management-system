import express from "express";
import {
  createComplaint,
  getMyComplaints,
  getAllComplaints,
  updateComplaintStatus,
} from "../controllers/complaintController.js";

import { protect, isAdmin, isStudent } from "../middleware/authMiddleware.js";

const router = express.Router();

/* STUDENT */
router.post("/", protect, isStudent, createComplaint);
router.get("/my", protect, isStudent, getMyComplaints);

/* ADMIN */
router.get("/all", protect, isAdmin, getAllComplaints);
router.put("/:id", protect, isAdmin, updateComplaintStatus);

export default router;

