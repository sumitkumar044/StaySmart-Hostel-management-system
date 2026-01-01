import express from "express";
import {
  createRequest,
  getAllRequests,
  updateRequestStatus,
  myRoom
} from "../controllers/requestController.js";
import { protect, isAdmin, isStudent } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, isStudent, createRequest);
router.get("/", protect, isAdmin, getAllRequests);
router.put("/:id", protect, isAdmin, updateRequestStatus);
router.get("/my-room", protect, isStudent, myRoom);

export default router;
