import express from "express";
import {protect, isAdmin } from "../middleware/authMiddleware.js";
import {adminDashboard, getAllStudentsSummary,deleteStudentCompletely } from "../controllers/adminController.js";

const router = express.Router();

router.get("/dashboard", protect, isAdmin, adminDashboard);
router.get("/students-summary", protect, isAdmin, getAllStudentsSummary);
router.delete(
  "/students/:id",
  protect,
  isAdmin,
  deleteStudentCompletely
);

export default router;
