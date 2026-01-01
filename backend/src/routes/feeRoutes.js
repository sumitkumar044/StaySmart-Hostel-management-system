import express from "express";
import {
  addFee,
  getAllFees,
  markFeePaid,
  fakePayFee,
  getStudentFees,
} from "../controllers/feeController.js";
import { protect, isAdmin, isStudent } from "../middleware/authMiddleware.js";

const router = express.Router();

/* ============ ADMIN ROUTES ============ */
router.post("/add", protect, isAdmin, addFee);
router.get("/all", protect, isAdmin, getAllFees);
router.put("/:id", protect, isAdmin, markFeePaid);

/* ============ STUDENT ROUTES ============ */
router.get("/my", protect, isStudent, getStudentFees);
router.put("/pay/:id", protect, isStudent, fakePayFee);

export default router;
