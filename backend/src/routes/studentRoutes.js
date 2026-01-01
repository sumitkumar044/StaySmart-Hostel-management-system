import express from "express";
import { protect, isStudent } from "../middleware/authMiddleware.js";
import {
  studentDashboard,
  getMyFees,
  getMyRoom,
} from "../controllers/studentController.js";

const router = express.Router();

// LIVE student dashboard
router.get("/dashboard", protect, isStudent, studentDashboard);

// other student endpoints
router.get("/fees", protect, isStudent, getMyFees);
router.get("/room", protect, isStudent, getMyRoom);

export default router;
